import { RootState } from '@root/lib/models';

export const searchTerm = (state: RootState) => state.store.searchTerm;
export const publicDodays = (state: RootState) => state.store.dodays;
