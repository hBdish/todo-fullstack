import { Column, Entity, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

import { AbstractEntity } from '../../shared/entities';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column({ length: 60 })
  name: string;

  @Unique('email', ['email'])
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
