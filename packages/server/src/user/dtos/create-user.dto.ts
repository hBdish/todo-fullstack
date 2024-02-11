import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateUser } from '@packages/shared';

export class CreateUserDto implements CreateUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 100)
  password: string;

  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  companyId: string | null;
}
