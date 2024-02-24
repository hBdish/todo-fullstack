import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';
import { CompanyEntity } from '../../company/entities';

@Entity('user')
export class UserEntity extends AbstractEntity implements User {
  @Column({ length: 60 })
  name: string;

  @Unique('email', ['email'])
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  photo: string;

  @ManyToOne(() => CompanyEntity, (company) => company.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;
}
