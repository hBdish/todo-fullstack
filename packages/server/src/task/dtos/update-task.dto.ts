import { TaskEntity } from '../entities';

export class UpdateTaskDto extends TaskEntity {
  name: string;
  description: string;
  status: string;
}
