import { IsEmail, IsString, Length } from 'class-validator';
import { UserEntity } from '../entities';

export class CreateUserDto extends UserEntity {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 100)
  password: string;

  @IsString()
  photo: string;
}
