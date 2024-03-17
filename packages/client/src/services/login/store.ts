import { makeAutoObservable, runInAction } from 'mobx';
import { SignInForm } from './types.ts';
import { AuthService } from './auth-service.ts';
import { setAccessKey, setRefreshKey } from '@data';
import { rootStore } from '../root-store.ts';

class LoginStore {
  auth = false;
  authFormData: SignInForm = {
    email: '',
    password: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  // setters
  setAuthDormData = <T extends keyof SignInForm>(
    field: T,
    value: SignInForm[T],
  ) => {
    this.authFormData[field] = value;
  };

  setAuth(value: boolean) {
    this.auth = value;
  }

  // async
  async refresh() {
    const user = await AuthService.refresh();

    if (user?.id) {
      runInAction(() => {
        this.setAuth(true);
        setAccessKey(user.accessToken);
        setRefreshKey(user.refreshToken);
      });

      await rootStore.userStore.getUser(user.id);
    }
  }

  async loginUser() {
    const user = await AuthService.login(this.authFormData);

    if (user?.id) {
      runInAction(() => {
        this.setAuth(true);
        setAccessKey(user.accessToken);
        setRefreshKey(user.refreshToken);
      });

      await rootStore.userStore.getUser(user.id);
    }
  }
}

export { LoginStore };
