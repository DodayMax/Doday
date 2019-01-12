import { observable, action, computed } from 'mobx';
import { activeDodaysForHero } from '../graphs/queries';
import { authStore } from '../stores/auth-store';

export interface Doday {
  id: string;
  name: string;
  completed: boolean;
}

export class DodayStore {
  constructor() {
    this._dodays = [];
  }

  @observable private _dodays: Doday[] = [];

  @computed
  get dodays(): Doday[] {
    return this._dodays;
  }

  @action
  public fetchActiveDodays = async () => {
    const { data }: any = await activeDodaysForHero({ id: authStore.currentHero!.uid });
    this._dodays = data.activeDodays;
    console.log('fetch', data);
  }

  @action
  public addDoday(doday: Doday) {
    this._dodays.push(doday);
  }

  @action
  public toggleDoday(id: string) {
    this._dodays.map(doday => {
      if (doday.id === id) {
        doday.completed = !doday.completed;
      }
    })
  }

  @action
  public removeDoday(id: string) {
    this._dodays.filter(doday => doday.id !== id)
  }
}

export const dodayStore = new DodayStore();