import { makeAutoObservable, runInAction } from 'mobx';
import { Company } from './types.ts';
import { CompanyService } from './company-service.ts';
import { User } from '../user';

class CompanyStore {
  company?: Company;
  isLoading = false;

  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // async
  async getCompanyData(id: string) {
    if (!id) return;

    this.isLoading = true;
    const company = await CompanyService.getCompany(id);
    runInAction(() => {
      this.isLoading = false;
      this.users = company.user;
      this.company = company;
    });
  }

  async patchUserCompany(user: User) {
    const company = await CompanyService.patchCompanyUser(
      this.company?.id || '',
      user,
    );

    this.isLoading = true;

    runInAction(() => {
      this.isLoading = false;
      this.users = company.user;
      this.company = company;
    });
  }
}

export { CompanyStore };
