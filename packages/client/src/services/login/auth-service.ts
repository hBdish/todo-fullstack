import { AuthResponse, SignInForm } from './types.ts';
import { apiClient } from '../api-client';

export class AuthService {
  static login(authData: SignInForm) {
    return apiClient.post<AuthResponse>('auth/login', authData);
  }
}
