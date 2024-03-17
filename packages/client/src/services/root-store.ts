import { makeAutoObservable } from 'mobx';

import { LoginStore } from './login';
import { UserStore } from './user';
import { CompanyStore } from './company';
import { ProjectStore } from './project';

class RootStore {
  loginStore: LoginStore;
  userStore: UserStore;
  companyStore: CompanyStore;
  projectStore: ProjectStore;

  constructor() {
    makeAutoObservable(this);

    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.companyStore = new CompanyStore();
    this.projectStore = new ProjectStore();
  }
}

const rootStore = new RootStore();

export { rootStore };
