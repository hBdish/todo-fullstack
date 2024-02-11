import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';

import { AuthService } from '../services';
import { UserAccessTokenClaims } from '../dtos';
import { STRATEGY_LOCAL } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<UserAccessTokenClaims> {
    // const user = await this.authService.validateUser(null, email, password);
    // return user;
    return;
  }
}
