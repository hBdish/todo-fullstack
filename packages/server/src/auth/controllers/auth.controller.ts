import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ReqContext, RequestContext } from '../../shared/request-context';

import { AddUserDto, CreateUserDto, OutputUserDto } from '../../user/dtos';

import { JwtRefreshGuard, LocalAuthGuard } from '../guards';
import { AuthService } from '../services';
import { AuthTokenOutput, LoginInput, RefreshTokenInput } from '../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @ReqContext() ctx: RequestContext,
    @Body() credential: LoginInput,
  ): AuthTokenOutput {
    return this.authService.login(ctx);
  }

  @Post('register')
  async registerLocal(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreateUserDto,
  ): Promise<OutputUserDto> {
    return await this.authService.register(ctx, input);
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @ReqContext() ctx: RequestContext,
    @Body() credential: RefreshTokenInput,
  ): Promise<AuthTokenOutput> {
    return await this.authService.refreshToken(ctx);
  }
}
