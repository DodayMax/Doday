import { observable, action, computed } from 'mobx';
import { DodayTypeMenuItem } from '@lib/common-interfaces';
const cuid = require('cuid');

export class BuilderStore {
  @observable private _selectedDodayType?: string = undefined;
  
  private _dodayTypes: DodayTypeMenuItem[] = [
    {
      id: cuid(),
      sysname: 'todo'
    },
    {
      id: cuid(),
      sysname: 'watch'
    },
    {
      id: cuid(),
      sysname: 'read'
    },
  ];

  get dodayTypes() {
    return this._dodayTypes;
  }

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