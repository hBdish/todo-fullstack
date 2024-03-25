import { TableEntity } from '../entities';
import { ProjectEntity } from '../../project/entities';

export class CreateTableDto extends TableEntity {
  name: string;
  project: ProjectEntity;
}
