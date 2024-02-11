import { Injectable, UnauthorizedException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

import { RequestContext } from '../../shared/request-context';
import { UserService } from '../../user/services';
import { CreateUserDto, OutputUserDto } from '../../user/dtos';

import { AuthTokenOutput, UserAccessTokenClaims } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    ctx: RequestContext,
    email: string,
    pass: string,
  ): Promise<UserAccessTokenClaims> {
    const user = await this.userService.validateUsernamePassword(
      ctx,
      email,
      pass,
    );

    return user;
  }

  login(ctx: RequestContext): AuthTokenOutput {
    return this.getAuthToken(ctx, ctx.user);
  }

  async register(
    ctx: RequestContext,
    input: CreateUserDto,
  ): Promise<OutputUserDto> {
    const registeredUser = await this.userService.createUser(ctx, input);
    return plainToInstance(OutputUserDto, registeredUser, {
      excludeExtraneousValues: true,
    });
  }

  async refreshToken(ctx: RequestContext): Promise<AuthTokenOutput> {
    const user = await this.userService.getUserById(ctx, ctx.user.id);
    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }

    return this.getAuthToken(ctx, user);
  }

  getAuthToken(
    ctx: RequestContext,
    user: UserAccessTokenClaims | OutputUserDto,
  ): AuthTokenOutput {
    const subject = { sub: user.id };
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: 60000,
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: 60000 },
      ),
      email: user.email,
      id: user.id,
    };

    return plainToInstance(AuthTokenOutput, authToken, {
      excludeExtraneousValues: true,
    });
  }
}
