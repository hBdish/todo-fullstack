import { IsArray, IsString } from 'class-validator';

import { CreateCompany } from '@packages/shared';

export class CreateCompanyDto implements CreateCompany {
  @IsString()
  name: string;

  @IsArray()
  projectId: string[];
}
