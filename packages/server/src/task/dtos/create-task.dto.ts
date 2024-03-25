import { TaskEntity } from '../entities';

export class CreateTaskDto extends TaskEntity {
  name: string;
  description: string;
  status: string;
}
