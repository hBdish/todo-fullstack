import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../shared/entities';
import { Task } from '@packages/shared';
import { TableEntity } from '../../table/entities';
import { ProjectEntity } from '../../project/entities';
import { UserEntity } from '../../user/entities';

@Entity('task')
export class TaskEntity extends AbstractEntity implements Task {
  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  name: string;

  @Column({
    default: null,
    nullable: true,
  })
  status: string;

  @Column({ nullable: true })
  dateSprintStart?: string;

  @Column({ nullable: true })
  dateSprintEnd?: string;

  @ManyToOne(() => TableEntity, (table) => table.tasks)
  table: TableEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.task, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
