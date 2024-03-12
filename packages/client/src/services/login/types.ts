interface SignInForm {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  id: string;
}

export type { SignInForm, AuthResponse };
