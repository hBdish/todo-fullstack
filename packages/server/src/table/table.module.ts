import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
})
export class TableModule {}
