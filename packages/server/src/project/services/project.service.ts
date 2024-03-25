import { Injectable } from '@nestjs/common';

import { ProjectRepository } from '../repositories';
import { RequestContext } from '../../shared/request-context';
import { CreateProjectDto } from '../dtos';
import { CompanyService } from '../../company/services';
import { plainToInstance } from 'class-transformer';
import { ProjectEntity } from '../entities';
import { TableService } from '../../table/services/table.service';
import { TableEntity } from '../../table/entities';

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
