import { AddUserToCompany, CreateUser, User } from './types.ts';
import { makeAutoObservable, runInAction } from 'mobx';
import { UserService } from './user-service.ts';

class UserStore {
  user: User = {
    id: '',
    createdAt: '',
    updatedAt: '',
    deleteAt: '',
    name: '',
    email: '',
    password: '',
    photo: '',
    company: {
      id: '',
      createdAt: '',
      updatedAt: '',
      deleteAt: '',
      name: '',
      project: [],
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUserId(id: string) {
    this.user.id = id;
  }

  // async
  async getUser(userId: string) {
    const user = await UserService.getUserInfo(userId);

    runInAction(() => {
      this.user = user;
    });
  }

  async addUserToCompany(addUser: AddUserToCompany) {
    const user = await UserService.addUserToCompany(addUser);

    runInAction(() => {
      this.user = user;
    });
  }

  async registerUser(createdUser: CreateUser) {
    const user = await UserService.registerUser(createdUser);

    runInAction(() => {
      this.user = user;
    });
  }
}

export { UserStore };
