import { IsEmail, IsString, Length } from 'class-validator';
import { AddUser } from '@packages/shared';

export class AddUserDto implements AddUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 100)
  password: string;

  @IsString()
  photo: string;

  @IsString()
  companyId: string;
}
