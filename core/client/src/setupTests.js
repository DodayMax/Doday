import './tempPolyfills';

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });
