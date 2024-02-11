import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
})
export class TaskModule {}
