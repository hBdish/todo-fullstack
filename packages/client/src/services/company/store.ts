import { makeAutoObservable, runInAction } from 'mobx';
import { Company } from './types.ts';
import { CompanyService } from './company-service.ts';

class CompanyStore {
  company?: Company;
  isLoading = false;

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
      this.company = company;
    });
  }
}

export { CompanyStore };
