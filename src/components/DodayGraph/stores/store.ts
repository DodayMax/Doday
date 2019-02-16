import { observable } from "mobx";

import store from "./domain-state";

// To support HMR of store, this ref holds the latest loaded store.
const storeInstance = observable.box(null)

function prepareStore(newStore) {
  storeInstance.set(newStore)
}

prepareStore(store)

export default storeInstance;