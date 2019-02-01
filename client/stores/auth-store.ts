import { observable, computed } from 'mobx';

export class AuthStore {
  @observable private _hero: any;

  @computed
  get currentHero() {
    return this._hero;
  }
}

export const authStore = new AuthStore();