import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RequestContext } from '../../shared/request-context';
import { CompanyService } from '../../company/services';
import { TableService } from '../../table/services';
import { TableEntity } from '../../table/entities';

import { ProjectRepository } from '../repositories';
import { ProjectEntity } from '../entities';
import { CreateProjectDto } from '../dtos';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private readonly companyService: CompanyService,
    private readonly tableService: TableService,
  ) {}

  async getProjectById(ctx: RequestContext, projectId: string) {
    return await this.projectRepository.getByIdWithRelations(projectId);
  }

  async deleteProject(projectId: string) {
    const deletedProject = await this.getProjectById(null, projectId);

    return await this.projectRepository.deleteProject(deletedProject);
  }

  async updateProject(project: ProjectEntity) {
    return await this.projectRepository.saveProject(project);
  }

  async createProject(
    ctx: RequestContext,
    createdProjectDto: CreateProjectDto,
  ) {
    const mainCompany = await this.companyService.getCompanyById(
      ctx,
      createdProjectDto.companyId,
    );

    const createdProject = plainToInstance(ProjectEntity, {
      ...createdProjectDto,
      company: mainCompany,
    });

    createdProject.table = await this.tableService.createTable(
      plainToInstance(TableEntity, {
        name: createdProject.name,
      }),
    );

    return await this.projectRepository.saveProject(createdProject);
  }
}
