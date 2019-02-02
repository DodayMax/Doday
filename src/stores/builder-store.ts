import { observable, action, computed } from 'mobx';

export class BuilderStore {
  @observable private _selectedDodayType?: string = undefined;

  @computed
  get selectedDodayType() {
    return this._selectedDodayType;
  }

  @action
  selectDodayType(type: string) {
    this._selectedDodayType = type;
  }

  @action
  clearSelectedType() {
    this._selectedDodayType = undefined;
  }
}

export const builderStore = new BuilderStore();