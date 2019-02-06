import { observable, action, computed } from 'mobx';
import { authStore } from '@stores';
import { api } from '@services';
const cuid = require('cuid');

export interface Doday {
  id: string;
  name: string;
  completed: boolean;
}

export class DodayStore {
  @observable private _dodays: Doday[] = [];

  @computed
  get dodays(): Doday[] {
    return this._dodays;
  }

  @action
  public fetchActiveDodays = async () => {
    const { data }: any = await api.dodays.queries.activeDodaysForHero({ id: authStore.heroID });
    this._dodays = data.activeDodays;
  }

  @action
  public createDodayNode = async (name: string) => {
    const newDoday = { id: cuid(), name, created: Date.now() };
    this._dodays.unshift({ ...newDoday, completed: false });
    try {
      const newDodayNode = await api.dodays.mutations.createDodayNode(newDoday);
      const newProgressNode = await api.dodays.mutations.createProgressNode({ id: cuid(), type: 'doday' });
      await api.dodays.mutations.addDodayOwner({ from: { id: authStore.heroID }, to: { id: (newDodayNode.data as any).CreateDoday.id } });
      await api.dodays.mutations.addProgressHero({ from: { id: authStore.heroID }, to: { id: (newProgressNode.data as any).CreateProgress.id } });

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
      await api.dodays.mutations.addProgressDoday({ from: { id: (newProgressNode.data as any).CreateProgress.id }, to: { id: (newDodayNode.data as any).CreateDoday.id }, data: doingProps });
    } catch (e) {
      this._dodays = this._dodays.filter(doday => doday.id !== newDoday.id);
    }
  }

  @action
  public completeDoday = async (id: string) => {
    const doday = this._dodays.find(doday => doday.id === id);
    if (doday) {
      this.updateDoday(id, { completed: !doday.completed });
      try {
        await api.dodays.mutations.toggleDoday({ heroID: authStore.heroID, dodayID: id, date: Date.now(), value: doday.completed });
      } catch (e) {
        this.updateDoday(id, { completed: !doday.completed });
      }
    }
  }

  private updateDoday(id: string, updates: any) {
    const doday = this._dodays.find(doday => doday.id === id);
    if (doday) {
      Object.entries(updates).forEach(([key, value]) => {
        doday[key] = value;
      });
    }
  }

  // @action
  // public removeDoday = async(id: string) => {
  //   await api.dodays.mutations.removeHeroDodays({ from: { id: 'id' }, to: { id } });
  //   await api.dodays.mutations.deleteDodayNode({ id });
  //   this.fetchActiveDodays();
  // }
}

export const dodayStore = new DodayStore();