import * as auth0 from 'auth0-js';
import { api, history } from '@services';
import store from '@root/store';
import { actions } from '@ducks/auth';

export class AuthService {
  private _hero: any = null;	
  private _dodayHero: any = null;	
  public isLoggedIn = false;

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
      store.dispatch(actions.updateAuthenticatedStatus());
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
	
  get currentHero() {	
    return this._hero;	
  }	
	
  get dodayHero() {	
    return this._dodayHero;	
  }	
	
  get heroID() {	
    return this._hero && this._hero.sub;	
  }	

  handleAuthentication = () => {	
    this.auth0.parseHash((err, authResult) => {	
      console.log(authResult);	
      if (authResult && authResult.accessToken && authResult.idToken) {	
        this.setSession(authResult);	
      } else if (err) {	
        history.replace('/');	
        console.log(err);	
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
      return this.auth0.client.userInfo(this.accessToken, async (err, profile) => {	
        if (profile) {	
          this._hero = profile;	
          const { data }: any = await api.heroes.queries.getHeroByID({ id: profile.sub });	
          if (!data.Hero.length) {	
            // Create new Hero node in db if it doesn't existed yet	
            await api.heroes.mutations.createHeroNode({ id: profile.sub, name: profile.nickname });	
            const { data }: any = await api.heroes.queries.getHeroByID({ id: profile.sub });	
            this._dodayHero = data.Hero[0];	
          }	
          this._dodayHero = data.Hero[0];	
        }	
      });	
    }	
  }	

  setSession = async (authResult) => {
    // Set flags in localStorage
    await localStorage.setItem('isLoggedIn', 'true');
    await localStorage.setItem('id_token', authResult.idToken);
    await localStorage.setItem('accessToken', authResult.accessToken);
    await localStorage.setItem('expiresIn', authResult.expiresIn);

     // Set the time that the access token will expire at	
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

     // schedule a token renewal	
    await this.scheduleRenewal();

     // fetch Hero profile	
    await this.fetchHeroProfile();

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

  logout = async () => {	
    // Remove tokens and expiry time	
    this.accessToken = null;	
    this.idToken = null;	
    this.expiresAt = 0;	
    this._hero = null;	

     // Remove flags from localStorage	
    await localStorage.removeItem('isLoggedIn');	
    await localStorage.removeItem('id_token');	
    await localStorage.removeItem('accessToken');	
    await localStorage.removeItem('expiresIn');	

     // Clear token renewal	
    clearTimeout(this.tokenRenewalTimeout);	

     // navigate to the home route	
    history.replace('/');	
  }	

  public isAuthenticated = () => {	
    // Check whether the current time is past the	
    // access token's expiry time	
    return this.isLoggedIn && new Date().getTime() < this.expiresAt;	
  }	
}	

 export const authService = new AuthService(); 