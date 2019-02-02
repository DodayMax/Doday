import { observable, action, computed, runInAction } from 'mobx';
import { DodayTypeMenuItem } from '@lib/common-interfaces';
import { globalUIStore } from './global-ui-store';
import { sysnames } from '@lib/constants';
const cuid = require('cuid');

export class BuilderUIStore {
  @observable private _selectedDodayType?: string = undefined;
  @observable private _dodayNameInput: string = '';
  
  private _dodayTypes: DodayTypeMenuItem[] = [
    {
      id: cuid(),
      sysname: sysnames.dodayTypes.todo
    },
    {
      id: cuid(),
      sysname: sysnames.dodayTypes.watch
    },
    {
      id: cuid(),
      sysname: sysnames.dodayTypes.read
    },
  ];

  get dodayTypes() {
    return this._dodayTypes;
  }

  @computed
  get dodayNameInput() {
    return this._dodayNameInput;
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
  changeDodayNameInput(value: string) {
    this._dodayNameInput = value;
  }
  
  @action
  createDoday() {
    globalUIStore.toggleBuilder();
    this.clear();
  }

  @action
  clear() {
    this._selectedDodayType = undefined;
    this._dodayNameInput = '';
  }
}

export const builderUIStore = new BuilderUIStore();