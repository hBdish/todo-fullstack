import { CompanyEntity } from '../entities';

export interface CompanyRepositoryInterface {
  saveCompany: (company: CompanyEntity) => Promise<CompanyEntity>;
}
