import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Project } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';
import { TaskEntity } from '../../task/entities';
import { TableEntity } from '../../table/entities';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity('project')
export class ProjectEntity extends AbstractEntity implements Project {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  photo: string;

  @Column({ default: '' })
  type: string;

  @Column()
  tableId: string;

  @Column()
  companyId: string;

  @OneToMany(() => ProjectEntity, (project) => project.task, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  task: TaskEntity;

  // @ManyToOne(() => CompanyEntity, (company) => company.project, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // company: CompanyEntity;

  @OneToOne(() => TableEntity, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  table: TableEntity;
}
