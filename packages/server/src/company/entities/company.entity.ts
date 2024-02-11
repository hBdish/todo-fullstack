import { Column, Entity } from 'typeorm';

import { Company } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';

@Entity('company')
export class CompanyEntity extends AbstractEntity implements Company {
  @Column({ default: '' })
  name: string;
}
