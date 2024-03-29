import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskEntity } from '../entities';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async getTaskById(id: string) {
    const foundTask = await this.findOne({
      where: {
        id,
      },
    });

    if (!foundTask) {
      throw new NotFoundException(`Не удалось найти таску`);
    }

    return foundTask;
  }

  async saveTask(task: TaskEntity) {
    const savedTask = await this.save(task);

    if (!savedTask) {
      throw new NotFoundException(`Не удалось сохранить таску`);
    }

    return savedTask;
  }

  async removeTask(task: TaskEntity) {
    const removedTask = await this.remove(task);

    if (!removedTask) {
      throw new NotFoundException(`Не удалось удалить таску`);
    }

    return removedTask;
  }
}
