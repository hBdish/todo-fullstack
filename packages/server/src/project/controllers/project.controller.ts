import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { UuidValidationPipe } from '../../shared/pipes';
import { ProjectService } from '../services';
import { CreateProjectDto } from '../dtos';

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

  @Post()
  async createProject(
    @ReqContext() ctx: RequestContext,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.createProject(ctx, createProjectDto);
  }
}
