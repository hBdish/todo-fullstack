import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Table } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';
import { TaskEntity } from '../../task/entities';
import { ProjectEntity } from '../../project/entities';

@Entity('table')
export class TableEntity extends AbstractEntity implements Table {
  @Column({ default: '' })
  name: string;

  @Column()
  projectId: string;

  task: TaskEntity;

  @OneToOne(() => ProjectEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: ProjectEntity;
}
