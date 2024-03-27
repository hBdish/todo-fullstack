import { Injectable } from '@nestjs/common';

import { TaskRepository } from '../repository';
import { CreateTaskDto } from '../dtos';
import { TableEntity } from '../../table/entities';
import { ProjectEntity } from '../../project/entities';
import { UserEntity } from '../../user/entities';
import { plainToInstance } from 'class-transformer';
import { TaskEntity } from '../entities';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(
    task: CreateTaskDto,
    table: TableEntity,
    project: ProjectEntity,
    user: UserEntity | undefined,
  ) {
    const createdTask = plainToInstance(TaskEntity, {
      ...task,
      table: table,
      project: project,
      user: user,
    });

    return await this.taskRepository.saveTask(createdTask);
  }

  async updateTask(task: TaskEntity) {
    console.log(task);

    const updatedTask = await this.taskRepository.getTaskById(task.id);

    return await this.taskRepository.saveTask(
      plainToInstance(TaskEntity, {
        ...updatedTask,
        ...task,
      }),
    );
  }
}
