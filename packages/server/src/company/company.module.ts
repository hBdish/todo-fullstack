import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from './entities';
import { CompanyService } from './services';
import { CompanyRepository } from './repositories';
import { CompanyController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyService, CompanyRepository],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
