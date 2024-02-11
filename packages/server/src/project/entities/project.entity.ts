import { Column, Entity } from 'typeorm';

import { Project } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';

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
}
