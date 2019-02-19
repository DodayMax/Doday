import { observable, action, computed } from 'mobx';
import { authStore } from '@stores';
import { api } from '@services';
import { Tag } from './config-store';
import { dateInputFromDate, dateInputStringFromDate, dateTimeInputFromDate } from '@lib/utils';
import { Doday } from '@lib/common-interfaces';
const cuid = require('cuid');

export class DodayStore {
  @observable private _dodays: Doday[] = [];
  @observable private _loading: boolean = false;

  @computed
  get dodays(): Doday[] {
    return this._dodays;
  }

  @computed
  get loading() { return this._loading; }

  @action
  public fetchActiveDodays = async () => {
    if (authStore.heroID) {
      const { data }: any = await api.dodays.queries.activeDodaysForHero({ id: authStore.heroID, date: dateInputStringFromDate(new Date()) });
      this._dodays = data.activeDodays;
    }
  }

  @action
  public createDodayNode = async (name: string, tags?: Tag[]) => {
    const newDoday = { id: cuid(), name, created: Date.now(), date: dateInputFromDate(new Date()) };
    this._dodays.unshift({ ...newDoday, completed: false });
    try {
      const newDodayNode = await api.dodays.mutations.createDodayNode(newDoday);
      const newProgressNode = await api.dodays.mutations.createProgressNode({ id: cuid(), type: 'doday' });
      await api.dodays.mutations.addDodayOwner({ from: { id: authStore.heroID }, to: { id: (newDodayNode.data as any).CreateDoday.id } });
      await api.dodays.mutations.addProgressHero({ from: { id: authStore.heroID }, to: { id: (newProgressNode.data as any).CreateProgress.id } });

      if (tags) {
        // Add selected tags to Doday
        await this.addTags((newDodayNode.data as any).CreateDoday.id, tags);
      }

      // Create DOING relation from Hero to Doday with props
      const today = new Date();
      const doingProps = {
        tookAt: dateTimeInputFromDate(today),
        completed: false,
      }
      await api.dodays.mutations.addProgressDoday({ from: { id: (newProgressNode.data as any).CreateProgress.id }, to: { id: (newDodayNode.data as any).CreateDoday.id }, data: doingProps });
    } catch (e) {
      this._dodays = this._dodays.filter(doday => doday.id !== newDoday.id);
    }
  }

  @action
  public addTags(dodayID: string, tags: Tag[]) {
    try {
      tags.forEach(async tag => {
        await api.dodays.mutations.addDodayTag({ from: { id: dodayID }, to: { id: tag.id }, data: { weight: 1 } });
      })
    } catch (e) {

    }
  }

  @action
  public completeDoday = async (id: string) => {
    const doday = this._dodays.find(doday => doday.id === id);
    const today = new Date();
    const day: any = await api.days.queries.getDay({ year: today.getFullYear(), month: today.getMonth(), day: today.getDate() });
    if (day.data.Day && day.data.Day.length > 0 && day.data.Day[0].active) {
      if (doday) {
        try {
          await api.dodays.mutations.toggleDoday({ heroID: authStore.heroID, dodayID: id, date: Date.now(), value: !doday.completed });
          await this.fetchActiveDodays();
        } catch (e) {
          // show error to Hero
        }
      }
    } else {
      console.log('This Date doesn\'t exist on the planet Earth!');
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