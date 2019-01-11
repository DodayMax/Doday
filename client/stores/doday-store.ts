import { observable, action, computed } from 'mobx';

const mockDodays = [{
  id: '1',
  title: 'First doday',
  completed: false,
}]

export interface Doday {
  id: string;
  title: string;
  completed: boolean;
}

export class DodayStore {
  constructor(dodays: Doday[]) {
    this._dodays = dodays;
  }

  @observable private _dodays: Doday[] = [];

  @computed
  get dodays(): Doday[] {
    return this._dodays;
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

export const dodayStore = new DodayStore(mockDodays);