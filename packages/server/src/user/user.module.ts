import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers';
import { UserService } from './services';
import { UserEntity } from './entities';
import { SharedModule } from '../shared';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
