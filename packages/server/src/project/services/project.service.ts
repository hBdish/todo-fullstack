import { Injectable } from '@nestjs/common';

import { ProjectRepository } from '../repositories';
import { RequestContext } from '../../shared/request-context';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async getProjectById(ctx: RequestContext, projectId: string) {
    return await this.projectRepository.getByIdWithRelations(projectId);
  }
}
