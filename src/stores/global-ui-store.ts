import { observable, action, computed } from 'mobx';

export class GlobalUIStore {
  @observable private _isBuilderShown = false;
  @observable private _isLoading = false;

  @computed
  get isBuilderShown() {
    return this._isBuilderShown;
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @action
  public toggleBuilder = () => {
    this._isBuilderShown = !this._isBuilderShown;
  }
}

export const globalUIStore = new GlobalUIStore();