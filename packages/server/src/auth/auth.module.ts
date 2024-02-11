import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user';

import { STRATEGY_JWT_AUTH } from './constants';
import { AuthService } from './services';
import { AuthController } from './controllers';
import {
  JwtAuthStrategy,
  JwtRefreshStrategy,
  LocalStrategy,
} from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: STRATEGY_JWT_AUTH }),
    UserModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAuthStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
