import { observable, action, computed } from 'mobx';
import { DodayTypeMenuItem } from '@lib/common-interfaces';
import { globalUIStore, authStore } from '@stores';
import { api } from '@services';
import { sysnames } from '@lib/constants';
import { dodayStore } from './doday-store';
import { Tag } from './config-store';
const cuid = require('cuid');

export class BuilderUIStore {
  @observable private _selectedDodayType?: string = undefined;
  @observable private _dodayNameInput: string = '';
  @observable private _tags?: Tag[] = undefined;
  
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

  @computed
  get tags() {
    return this._tags;
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
  changeDodayTagsInput(tags: Tag[]) {
    this._tags = tags;
  }
  
  @action
  async createDoday() {
    dodayStore.createDodayNode(this._dodayNameInput, this._tags);
    globalUIStore.toggleBuilder();
    this.clear();
  }

  @action
  clear() {
    this._selectedDodayType = undefined;
    this._dodayNameInput = '';
    this._tags = undefined;
  }
}

export const builderUIStore = new BuilderUIStore();