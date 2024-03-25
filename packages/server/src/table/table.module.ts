import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './entities';
import { TableRepository } from './repository';
import { TableService } from './services/table.service';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  providers: [TableService, TableRepository],
  exports: [TableService],
})
export class TableModule {}
