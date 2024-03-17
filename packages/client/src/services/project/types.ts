import { Table } from '../table';

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleteAt: string;
  name: string;
  photo: string;
  type: string;
  table: Table;
}
