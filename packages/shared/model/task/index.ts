export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleteAt: Date | null;
}
