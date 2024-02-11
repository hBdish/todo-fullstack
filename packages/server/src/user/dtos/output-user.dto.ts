import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../shared/dtos';

import { UserEntity } from '../entities';

export class OutputUserDto extends AbstractDto implements UserEntity {
  @Expose()
  name: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  photo: string;

  @Exclude()
  createdByUserId: string | null;
}
