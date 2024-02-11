import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { STRATEGY_JWT_REFRESH } from '../constants';
import { UserRefreshTokenClaims } from '../dtos';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_JWT_REFRESH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any): Promise<UserRefreshTokenClaims> {
    return { id: payload.sub };
  }
}
