import { Expose } from 'class-transformer';

export class AuthTokenOutput {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  email: string;

  @Expose()
  id: number;
}

export class UserAccessTokenClaims {
  @Expose()
  id: string;

  @Expose()
  email: string;
}

export class UserRefreshTokenClaims {
  id: number;
}
