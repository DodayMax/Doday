import { observable, action, computed } from 'mobx';
import { DodayTypeMenuItem } from '@lib/common-interfaces';
import { globalUIStore, authStore } from '@stores';
import { api } from '@services';
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
  async createDoday() {
    try {
      const newDodayNode = await api.dodays.mutations.createDodayNode({ name: this._dodayNameInput, created: Date.now() });
      await api.dodays.mutations.addDodayOwner({ from: { id: authStore.currentHero.sub }, to: { id: (newDodayNode.data! as any).CreateDoday.id } });
      await api.dodays.mutations.addDodayCategories({ from: { id: (newDodayNode.data! as any).CreateDoday.id }, to: { id: "100" } });

      // Create DOING relation from Hero to Doday with props
      const today = new Date();
      const doingProps = {
        tookAt: {
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate(),
          hour: today.getHours(),
          minute: today.getMinutes(),
          second: today.getSeconds(),
        },
        completed: false,
      }
      await api.heroes.mutations.addHeroDodays({ from: { id: authStore.currentHero.sub }, to: { id: (newDodayNode.data! as any).CreateDoday.id }, data: doingProps },);
    } catch (e) {

    }
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