import { RootState } from '@doday/lib';

export const searchTerm = (state: RootState) => state.store.searchTerm;
export const publicDodays = (state: RootState) => state.store.dodays;
