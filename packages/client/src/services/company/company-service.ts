import { apiClient } from '../api-client';
import { Company } from './types.ts';
import { User } from '../user';

export class CompanyService {
  static getCompany(id: string) {
    return apiClient.get<Company>(`company/${id}`);
  }

  static patchCompanyUser(companyId: string, user: User) {
    return apiClient.patch<Company>(`/company/user/${companyId}`, user);
  }
}
