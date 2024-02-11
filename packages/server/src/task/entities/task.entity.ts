import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared/entities';
import { Task, TaskStatus } from '@packages/shared';

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
}
