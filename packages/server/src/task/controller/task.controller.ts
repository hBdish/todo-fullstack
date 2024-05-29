import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { TaskService } from '../services';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { CreateTaskDto } from '../dtos';
import { TableEntity } from '../../table/entities';
import { ProjectEntity } from '../../project/entities';
import { UserEntity } from '../../user/entities';
import { TaskEntity } from '../entities';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @ReqContext() ctx: RequestContext,
    @Body()
    createTaskBody: {
      task: CreateTaskDto;
      table: TableEntity;
      project: ProjectEntity;
      user: UserEntity;
    },
  ) {
    const { task, table, project, user } = createTaskBody;
    return await this.taskService.createTask(task, table, project, user);
  }

  @Patch()
  async updateTask(
    @ReqContext() ctx: RequestContext,
    @Body() task: TaskEntity,
  ) {
    return await this.taskService.updateTask(task);
  }

  @Delete(':id')
  async deleteTask(
    @ReqContext() ctx: RequestContext,
    @Param('id') taskId: string,
  ) {
    return await this.taskService.deleteTask(taskId);
  }

  @Post('close-sprint')
  async closeSprint(@Body() tasks: TaskEntity[]): Promise<
    {
      name: string;
      wait: number;
      inWork: number;
      done: number;
      imposible: number;
    }[]
  > {
    return await this.taskService.closeSprint(tasks);
  }
}
