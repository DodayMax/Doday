import { observable, action, computed } from 'mobx';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

const options = {
  allowedConnections: ['google-oauth2', 'vkontakte'],
  theme: {
    primaryColor: '#222'
  },
  socialButtonStyle: "small",
};

const lock = new Auth0Lock(
  '9W19nila2vQ9zh3TrMVza6Vl4xghJs4u',
  'doday.eu.auth0.com',
  options as any
);

// Listening for the authenticated event
lock.on("authenticated", function (authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      // Handle error
      return;
    }
    console.log(authResult, 'auth');
    console.log(profile, 'profile');

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});

export class AuthStore {
  @observable private _hero: any;

  auth0 = new auth0.WebAuth({
    domain: 'doday.eu.auth0.com',
    clientID: '9W19nila2vQ9zh3TrMVza6Vl4xghJs4u',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  showLock() {
    lock.show();
  }

  @computed
  get currentHero() {
    return this._hero;
  }
}

export const authStore = new AuthStore();