import { Table } from '../table';
import { Task } from '../task/types.ts';

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
