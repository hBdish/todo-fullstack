import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/entities';
import { Task, TaskStatus } from '@packages/shared';
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
    default: 'executed',
  })
  status: TaskStatus;

  @Column()
  tableId: string;

  @Column()
  executorId: string;

  @Column()
  projectId: string;

  @Column()
  authorId: string;

  @ManyToOne(() => TableEntity, (table) => table.task, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  table: TableEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.task, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  // @OneToMany(() => UserEntity, (user) => user.task, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // user: UserEntity;
}
