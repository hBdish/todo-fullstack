import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { UuidValidationPipe } from '../../shared/pipes';
import { ProjectService } from '../services';
import { CreateProjectDto } from '../dtos';
import { ProjectEntity } from '../entities';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  async getProject(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) projectId: string,
  ) {
    return await this.projectService.getProjectById(ctx, projectId);
  }

  @Delete(':id')
  async deleteProject(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) projectId: string,
  ) {
    return await this.projectService.deleteProject(projectId);
  }

  @Patch()
  async patchProject(
    @ReqContext() ctx: RequestContext,
    @Body() updateProject: ProjectEntity,
  ) {
    return await this.projectService.updateProject(updateProject);
  }

  @Post()
  async createProject(
    @ReqContext() ctx: RequestContext,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.createProject(ctx, createProjectDto);
  }
}
