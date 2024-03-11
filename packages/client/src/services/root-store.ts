import { makeAutoObservable } from 'mobx';
import { LoginStore } from './login/store.ts';

class RootStore {
  loginStore: LoginStore;

  constructor() {
    makeAutoObservable(this);

    this.loginStore = new LoginStore();
  }
}

const rootStore = new RootStore();

export { rootStore };
