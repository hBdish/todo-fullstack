import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { Company } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';
import { UserEntity } from '../../user/entities';

@Entity('company')
export class CompanyEntity extends AbstractEntity implements Company {
  @Column({ default: '' })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.company, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity[];
}
