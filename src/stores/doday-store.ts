import { observable, action, computed } from 'mobx';
import { dodays, heroes } from '@api';

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
    const { data }: any = await dodays.queries.activeDodaysForHero({ id: 'id' });
    this._dodays = data.activeDodays;
  }

  @action
  public createDodayNode = async (name: string) => {
    const { data }: any = await dodays.mutations.createDodayNode({ name, created: Date.now() });
    await heroes.mutations.addHeroDodays({ from: { id: 'id' }, to: { id: data!.CreateDoday.id } });
    this.fetchActiveDodays();
  }

  @action
  public completeDoday = async (id: string) => {
    await dodays.mutations.removeHeroDodays({ from: { id: 'id' }, to: { id } });
    await dodays.mutations.addHeroDone({ from: { id: 'id' }, to: { id } });
    this.fetchActiveDodays();
  }

  @action
  public removeDoday = async(id: string) => {
    await dodays.mutations.removeHeroDodays({ from: { id: 'id' }, to: { id } });
    await dodays.mutations.deleteDodayNode({ id });
    this.fetchActiveDodays();
  }
}

export const dodayStore = new DodayStore();