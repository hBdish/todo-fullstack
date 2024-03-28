import { Project } from '../project';
import { User } from '../user';

export interface Company {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
  name: string;
  project: Project[];
  user: User[];
}
