import { observable, action, computed } from 'mobx';
import { api } from '@services';

export interface Tag {
  id: string;
  sysname: string;
}

export class ConfigStore {
  @observable private _tags: Tag[] = [];

  @computed
  get tags() {
    return this._tags;
  }

  @action
  async fetchAllTags() {
    const { data }: any = await api.tags.queries.getAllTags({ sysname: '' });
    this._tags = data.allTags;
  }
}

export const configStore = new ConfigStore();