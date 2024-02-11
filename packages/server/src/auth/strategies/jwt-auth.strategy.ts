import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { STRATEGY_JWT_AUTH } from '../constants';
import { UserAccessTokenClaims } from '../dtos';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_JWT_AUTH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }
  async validate(payload: any): Promise<UserAccessTokenClaims> {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
