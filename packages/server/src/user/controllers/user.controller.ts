import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ReqContext, RequestContext } from '../../shared/request-context';
import { UuidValidationPipe } from '../../shared/pipes';

import { JwtAuthGuard } from '../../auth/guards';

import { CreateUserDto, OutputUserDto, UpdateUserDto } from '../dtos';
import { UserService } from '../services';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @ReqContext() ctx: RequestContext,
    @Body() createUserDto: CreateUserDto,
  ): Promise<OutputUserDto> {
    return await this.userService.createUser(ctx, createUserDto);
  }

  @Patch(':id')
  async updateUser(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<OutputUserDto> {
    const updatedUser = await this.userService.updateUser(
      ctx,
      userId,
      updateUserDto,
    );

    return updatedUser;
  }

  @Get(':id')
  async getUser(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<OutputUserDto> {
    return await this.userService.getUserById(ctx, id);
  }

  @Delete(':id')
  async deleteUser(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) userId: string,
  ): Promise<void> {
    await this.userService.getUserById(ctx, userId);

    return this.userService.deleteUser(ctx, userId);
  }
}
