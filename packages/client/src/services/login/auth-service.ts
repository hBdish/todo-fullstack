import { AuthResponse, SignInForm } from './types.ts';
import { apiClient } from '../api-client';
import { getRefreshKey } from '@data';

export class AuthService {
  static login(authData: SignInForm) {
    return apiClient.post<AuthResponse>('auth/login', authData);
  }

  static refresh() {
    return apiClient.post<AuthResponse>('auth/refresh-token', {
      refreshToken: getRefreshKey(),
    });
  }
}
