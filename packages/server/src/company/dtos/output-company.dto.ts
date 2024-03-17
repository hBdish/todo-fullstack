import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { Company } from '@packages/shared';

import { AbstractDto } from '../../shared/dtos';
import { OutputUserDto } from '../../user/dtos';

export class OutputCompanyDto extends AbstractDto implements Company {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @Expose()
  users: OutputUserDto[];
}
