import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth';
import { UserModule } from './user';
import { CompanyModule } from './company';
import { ProjectModule } from './project';
import { TableModule } from './table';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CompanyModule,
    ProjectModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
