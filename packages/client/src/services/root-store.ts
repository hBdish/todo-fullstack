import { makeAutoObservable } from 'mobx';

import { LoginStore } from './login';
import { UserStore } from './user';
import { CompanyStore } from './company';
import { ProjectStore } from './project';
import { TableStore } from './table';
import { TaskStore } from './task';

class RootStore {
  loginStore: LoginStore;
  userStore: UserStore;
  companyStore: CompanyStore;
  projectStore: ProjectStore;
  tableStore: TableStore;
  taskStore: TaskStore;

  constructor() {
    makeAutoObservable(this);

    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.companyStore = new CompanyStore();
    this.projectStore = new ProjectStore();
    this.tableStore = new TableStore();
    this.taskStore = new TaskStore();
  }
}

const rootStore = new RootStore();

export { rootStore };
