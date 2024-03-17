import { apiClient } from '../api-client';
import { Company } from './types.ts';

export class CompanyService {
  static getCompany(id: string) {
    return apiClient.get<Company>(`company/${id}`);
  }
}
