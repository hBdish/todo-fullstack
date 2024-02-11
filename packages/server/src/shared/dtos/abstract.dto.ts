import { Exclude, Expose } from 'class-transformer';

export abstract class AbstractDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude()
  deleteAt: Date;
}
