import { Company } from '@services';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  company: Company;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  photo: string;
}

export interface AddUserToCompany {
  name: string;
  email: string;
  password: string;
  photo: string;
  companyId: string;
}
