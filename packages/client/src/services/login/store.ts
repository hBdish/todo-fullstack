import { makeAutoObservable } from 'mobx';
import { SignInForm } from './types.ts';
import { AuthService } from './auth-service.ts';
import { setAccessKey } from '@data';

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
  async login() {
    const user = await AuthService.login(this.authFormData);

    if (user?.id) {
      this.setAuth(true);
      setAccessKey(user.accessToken);
    }
  }
}

export { LoginStore };
