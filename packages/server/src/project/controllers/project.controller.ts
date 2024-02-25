import { Controller, Get, Param } from '@nestjs/common';
import { ReqContext, RequestContext } from '../../shared/request-context';
import { UuidValidationPipe } from '../../shared/pipes';
import { ProjectService } from '../services';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  get() {
    return 'test';
  }

  @Get(':id')
  async getProject(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) projectId: string,
  ) {
    return await this.projectService.getProjectById(ctx, projectId);
  }
}
