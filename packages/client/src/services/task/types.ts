import { Table } from '../table';
import { Project } from '../project';

export interface Task {
  id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  name: string;
  status: string;
}

export interface CreateTask {
  task: {
    name: string;
    description: string;
    status: string;
  };
  table: Table;
  project: Project;
}
