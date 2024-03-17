import { Project } from '../project';

export interface Company {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
  name: string;
  project: Project[];
}
