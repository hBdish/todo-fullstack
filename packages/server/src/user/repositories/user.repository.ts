import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../entities';
import { UsersRepositoryInterface } from '../interfaces';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements UsersRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Пользователь с id: ${id} не найден`);
    }

    return user;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }

    return user;
  }

  async saveUser(user: UserEntity): Promise<UserEntity> {
    const savedUser = await this.save(user);
    if (!savedUser) {
      throw new InternalServerErrorException(
        'Ошибка сохранения пользователя в Базе данных',
      );
    }

    return savedUser;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.find({
      relations: {
        company: true,
      },
    });
    // const users = await this.findAndCount({
    //   where: {
    //     name: ILike('%' + search + '%'),
    //     createdByUserId: parentId ? parentId : null,
    //   },
    //   order: { createdAt: 'ASC' },
    //   take: size,
    //   skip: (page - 1) * size,
    // });
    if (!users) {
      throw new NotFoundException('Ошибка получения пользователей');
    }

    return users;
  }

  async deleteUser(user: UserEntity): Promise<UserEntity> {
    const deletedUser = await this.softRemove(user);
    if (!deletedUser) {
      throw new InternalServerErrorException('Ошибка удаления пользователя');
    }

    return;
  }
}
