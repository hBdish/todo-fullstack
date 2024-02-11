import { Column, Entity } from 'typeorm';

import { Table } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';

@Entity('table')
export class TableEntity extends AbstractEntity implements Table {
  @Column({ default: '' })
  name: string;

  @Column()
  projectId: string;
}
