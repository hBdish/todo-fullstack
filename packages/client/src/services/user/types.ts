import { Company } from '../company';

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
