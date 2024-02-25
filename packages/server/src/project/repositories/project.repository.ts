import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ProjectEntity } from '../entities';

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
  constructor(private dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<ProjectEntity> {
    const project = await this.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`Проект с id: ${id} не найден`);
    }

    return project;
  }

  async getByIdWithRelations(id: string): Promise<ProjectEntity> {
    const project = await this.findOne({
      where: { id },
      relations: {
        table: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Проект с id: ${id} не найден`);
    }

    return project;
  }
}
