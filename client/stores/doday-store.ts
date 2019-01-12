import { observable, action, computed } from 'mobx';
import { createDodayNode, addHeroDodays, removeHeroDodays, deleteDodayNode } from '../graphs/mutations';
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
  }

  @action
  public createDodayNode = async () => {
    const { data }: any = await createDodayNode({ name: `${Math.random()} doday`, created: Date.now() });
    await addHeroDodays({ from: { id: authStore.currentHero!.uid }, to: { id: data!.CreateDoday.id } });
    this.fetchActiveDodays();
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
  public removeDoday = async(id: string) => {
    await removeHeroDodays({ from: { id: authStore.currentHero!.uid }, to: { id } });
    await deleteDodayNode({ id });
    this.fetchActiveDodays();
  }
}

export const dodayStore = new DodayStore();