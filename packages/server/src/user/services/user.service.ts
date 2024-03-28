import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { compare, hash } from 'bcrypt';

import { RequestContext } from '../../shared/request-context';

import {
  AddUserDto,
  CreateUserDto,
  OutputUserDto,
  UpdateUserDto,
} from '../dtos';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';
import { CompanyService } from '../../company/services';
import { CompanyEntity } from '../../company/entities';
import { CreateCompanyDto } from '../../company/dtos';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly companyService: CompanyService,
  ) {}

  async createUser(
    ctx: RequestContext,
    input: CreateUserDto,
  ): Promise<OutputUserDto> {
    const user = plainToInstance(UserEntity, input);
    user.password = await hash(input.password, 10);

    user.company = await this.companyService.createCompany(
      ctx,
      plainToInstance(CreateCompanyDto, {
        name: 'company',
      }),
    );

    const savedUser = await this.userRepository.saveUser(user);

    if (!savedUser) {
      throw new HttpException('Не удалось создать пользователя', 403);
    }

    return plainToInstance(OutputUserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async addUserToCompany(
    ctx: RequestContext,
    input: AddUserDto,
  ): Promise<OutputUserDto> {
    const user = plainToInstance(UserEntity, input);
    user.password = await hash(input.password, 10);

    user.company = await this.companyService.getCompanyById(
      ctx,
      input.companyId,
    );

    const savedUser = await this.userRepository.saveUser(user);

    if (!savedUser) {
      throw new HttpException('Не удалось добавить пользователя', 403);
    }

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
