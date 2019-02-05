import { observable, action, computed } from 'mobx';
import * as auth0 from 'auth0-js';
import { api, history } from '@services';


export class AuthStore {
  @observable private _hero: any = null;
  @observable public isLoggedIn = false;

  private accessToken;
  private idToken;
  private expiresAt;
  private tokenRenewalTimeout;

  constructor() {
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    this.idToken = localStorage.getItem('id_token');
    this.accessToken = localStorage.getItem('accessToken');
    const expiresIn = Number(localStorage.getItem('expiresIn'));
    this.expiresAt = (expiresIn * 1000) + new Date().getTime();

    if (this.isAuthenticated()) {
      this.fetchHeroProfile();
      this.scheduleRenewal();
    } else {
      this.renewSession();
    }
  }

  auth0 = new auth0.WebAuth({
    domain: 'doday.eu.auth0.com',
    clientID: 'ETaYtEdwUg2x24UeIRYf7Y2DZzvGx7Lh',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  // Show login form
  login() {
    this.auth0.authorize();
  }

  @computed
  get currentHero() {
    return this._hero;
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = () => {
    return this.idToken;
  }

  fetchHeroProfile = () => {
    if (this.accessToken) {
      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (profile) {
          this._hero = profile;
        }
      });
    }
  }

  setSession = (authResult) => {
    console.log(authResult);
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('expiresIn', authResult.expiresIn);

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // schedule a token renewal
    this.scheduleRenewal();

    // fetch Hero profile
    this.fetchHeroProfile();

    // navigate to the home route
    history.replace('/');
  }

  /**
   * Renewed token when expired 
   */
  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.description}).`);
      }
    });
  }

  /**
   * Schedule renewal token
   */

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this._hero = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('id_token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');

    // Clear token renewal
    clearTimeout(this.tokenRenewalTimeout);

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}

export const authStore = new AuthStore();