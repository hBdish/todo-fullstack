import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Table } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';

import { ProjectEntity } from '../../project/entities';
import { TaskEntity } from '../../task/entities';

@Entity('table')
export class TableEntity extends AbstractEntity implements Table {
  @Column({ default: '' })
  name: string;

  @Column({ type: 'jsonb', default: [] })
  workflow: string[];

  @Column({ nullable: true })
  dateSprintStart?: string;

  @OneToOne(() => ProjectEntity, (project) => project.table, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @OneToMany(() => TaskEntity, (task) => task.table)
  tasks: TaskEntity[];
}
