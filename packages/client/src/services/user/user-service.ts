import { apiClient } from '../api-client';
import { AddUserToCompany, CreateUser, User } from './types.ts';

export class UserService {
  static getUserInfo(id: string) {
    return apiClient.get<User>(`users/${id}`);
  }

  static registerUser(user: CreateUser) {
    return apiClient.post<User>('auth/register', user);
  }

  static addUserToCompany(addUser: AddUserToCompany) {
    return apiClient.post<User>('users/company', addUser);
  }
}
