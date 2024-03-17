import { apiClient } from '../api-client';
import { User } from './types.ts';

export class UserService {
  static getUserInfo(id: string) {
    return apiClient.get<User>(`users/${id}`);
  }
}
