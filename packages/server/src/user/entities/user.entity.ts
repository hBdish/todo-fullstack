import { Column, Entity, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '@packages/shared';

import { AbstractEntity } from '../../shared/entities';

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

  @Column({ nullable: true })
  public companyId: string | null;
}
