import { Table } from '../table';
import { Task } from '../task';

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
  name: string;
  photo: string;
  type: string;
  table: Table;
  task: Task[];
}

export interface CreateProject {
  name: string;
  photo: string;
  type: string;
  companyId: string;
}
