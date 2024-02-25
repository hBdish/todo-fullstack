import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Project } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';
import { TaskEntity } from '../../task/entities';
import { CompanyEntity } from '../../company/entities';
import { TableEntity } from '../../table/entities';

@Entity('project')
export class ProjectEntity extends AbstractEntity implements Project {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  photo: string;

  @Column({ default: '' })
  type: string;

  @OneToMany(() => ProjectEntity, (project) => project.task, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  task: TaskEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.project, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @OneToOne(() => TableEntity, (table) => table.project)
  table: TableEntity;
}
