import { ProjectEntity } from '../entities';

export class CreateProjectDto extends ProjectEntity {
  companyId: string;
  name: string;
  type: string;
  photo: string;
}
