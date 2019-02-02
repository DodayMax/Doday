import { observable, action, computed } from 'mobx';

export class GlobalUIStore {
  @observable private _isBuilderShown = false;

  @computed
  get isBuilderShown() {
    return this._isBuilderShown;
  }

  @action
  public toggleBuilder = () => {
    this._isBuilderShown = !this._isBuilderShown;
  }
}

export const globalUIStore = new GlobalUIStore();