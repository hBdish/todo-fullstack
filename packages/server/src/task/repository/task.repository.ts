import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskEntity } from '../entities';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async saveTask(task: TaskEntity) {
    const savedTask = await this.save(task);

    if (!savedTask) {
      throw new NotFoundException(`Не удалось сохранить таску`);
    }

    return savedTask;
  }
}
