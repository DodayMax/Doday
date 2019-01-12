import { observable, action, computed } from 'mobx';
import * as firebase from 'firebase/app';

export class AuthStore {
  @observable private _hero: firebase.User | undefined | null = undefined;

  @computed
  get currentHero(): firebase.User | undefined | null {
    return this._hero;
  }

  @action
  loginAnonymously() {
    return firebase.auth().signInAnonymously();
  }

  @action
  listenAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this._hero = user;
      } else {
        // User is signed out.
        this._hero = null;
      }
    });
  }
}

export const authStore = new AuthStore();