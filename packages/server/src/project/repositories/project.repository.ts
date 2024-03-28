import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ProjectEntity } from '../entities';

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
  constructor(private dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  async saveProject(project: ProjectEntity) {
    const savedProject = await this.save(project);

    if (!project) {
      throw new NotFoundException(`Не удалось сохранить проект`);
    }

    return savedProject;
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
        task: {
          user: true,
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Проект с id: ${id} не найден`);
    }

    return project;
  }

  async deleteProject(project: ProjectEntity) {
    const deletedProject = await this.remove(project);

    if (!deletedProject) {
      throw new NotFoundException(`Не удалось удалить проект`);
    }

    return deletedProject;
  }
}
