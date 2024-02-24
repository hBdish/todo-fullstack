import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared';

import { UserController } from './controllers';
import { UserService } from './services';
import { UserEntity } from './entities';
import { UserRepository } from './repositories';
import { CompanyModule } from '../company';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CompanyModule,
    SharedModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
