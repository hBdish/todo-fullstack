import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { compare, hash } from 'bcrypt';

import { RequestContext } from '../../shared/request-context';

import { CreateUserDto, OutputUserDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(
    ctx: RequestContext,
    input: CreateUserDto,
  ): Promise<OutputUserDto> {
    const user = plainToInstance(UserEntity, input);
    user.password = await hash(input.password, 10);
    user.createdByUserId = input.createdByUserId;

    await this.userRepository.saveUser(user);

    return plainToInstance(OutputUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    ctx: RequestContext,
    userId: string,
    input: UpdateUserDto,
  ): Promise<OutputUserDto> {
    const user = await this.userRepository.getById(userId);

    if (input.password) {
      user.password = await hash(input.password, 10);
    }

    const updatedUser: UserEntity = {
      ...user,
      ...input,
    };

    return await this.userRepository.saveUser(updatedUser);
  }

  async deleteUser(ctx: RequestContext, userId: string): Promise<void> {
    const user = await this.userRepository.getById(userId);

    await this.userRepository.deleteUser(user);

    return;
  }

  async getUserById(
    ctx: RequestContext,
    userId: string,
  ): Promise<OutputUserDto> {
    return await this.userRepository.getById(userId);
  }

  async validateUsernamePassword(
    ctx: RequestContext,
    email: string,
    pass: string,
  ): Promise<OutputUserDto> {
    const user = await this.userRepository.getByEmail(email);

    const match = await compare(pass, user.password);
    if (!match) throw new UnauthorizedException();

    return plainToInstance(OutputUserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}