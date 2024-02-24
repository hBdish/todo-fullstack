import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '../../shared/dtos';

import { Company, User } from '@packages/shared';

export class OutputUserDto extends AbstractDto implements User {
  @Expose()
  name: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  photo: string;

  @Exclude()
  company: Company;
}
