import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ nullable: true })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Exclude()
  public updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  public deleteAt: Date;
}
