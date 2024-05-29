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
    const updatedTask = await this.taskRepository.getTaskById(task.id);

    return await this.taskRepository.saveTask(
      plainToInstance(TaskEntity, {
        ...updatedTask,
        ...task,
      }),
    );
  }

  async deleteTask(taskId: string) {
    const deletedTask = await this.taskRepository.getTaskById(taskId);

    return await this.taskRepository.removeTask(deletedTask);
  }

  async closeSprint(tasks: TaskEntity[]): Promise<
    {
      name: string;
      wait: number;
      inWork: number;
      done: number;
      imposible: number;
    }[]
  > {
    const completedTasks = tasks.filter((task) => task.status === 'Выполнены');
    const impossibleTasks = tasks.filter(
      (task) => task.status === 'Невозможно выполнить',
    );

    await Promise.all(
      completedTasks.map(
        async (tasks) =>
          await this.taskRepository.removeTask(
            plainToInstance(TaskEntity, tasks),
          ),
      ),
    );

    await Promise.all(
      impossibleTasks.map(
        async (tasks) =>
          await this.taskRepository.removeTask(
            plainToInstance(TaskEntity, tasks),
          ),
      ),
    );

    const res = new Map();

    tasks.forEach((task) =>
      res.set(task.user?.name || '', {
        wait: 0,
        inWork: 0,
        done: 0,
        imposible: 0,
      }),
    );

    tasks.forEach((task) => {
      const obj = res.get(task.user?.name || '');
      console.log(task.status);

      if (task.status === 'Не начаты') {
        obj.wait += 1;
      }

      if (task.status === 'В работе') {
        obj.inWork += 1;
      }

      if (task.status === 'Выполнены') {
        obj.done += 1;
      }

      if (task.status === 'Невозможно выполнить') {
        obj.imposible += 1;
      }

      console.log(obj);
    });

    const sprintInfo: {
      name: string;
      wait: number;
      inWork: number;
      done: number;
      imposible: number;
    }[] = [];

    for (const name of res.keys()) {
      const val = res.get(name);

      sprintInfo.push({ name, ...val });
    }

    return sprintInfo;
  }
}
