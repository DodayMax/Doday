import { observable, action, computed } from 'mobx';
import { createDodayNode, addHeroDodays, removeHeroDodays, deleteDodayNode, addHeroDone } from '../graphs/mutations';
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
  public createDodayNode = async (name: string) => {
    const { data }: any = await createDodayNode({ name, created: Date.now() });
    await addHeroDodays({ from: { id: authStore.currentHero!.uid }, to: { id: data!.CreateDoday.id } });
    this.fetchActiveDodays();
  }

  @action
  public completeDoday = async (id: string) => {
    await removeHeroDodays({ from: { id: authStore.currentHero!.uid }, to: { id } });
    await addHeroDone({ from: { id: authStore.currentHero!.uid }, to: { id } });
    this.fetchActiveDodays();
  }

  @action
  public removeDoday = async(id: string) => {
    await removeHeroDodays({ from: { id: authStore.currentHero!.uid }, to: { id } });
    await deleteDodayNode({ id });
    this.fetchActiveDodays();
  }
}

export const dodayStore = new DodayStore();