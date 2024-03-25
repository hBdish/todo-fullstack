import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectEntity } from './entities';
import { ProjectController } from './controllers';
import { ProjectService } from './services';
import { ProjectRepository } from './repositories';
import { CompanyModule } from '../company';
import { TableModule } from '../table';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    CompanyModule,
    TableModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
