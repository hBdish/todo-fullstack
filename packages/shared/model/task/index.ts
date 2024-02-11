export type TaskStatus = 'in_work' | 'executed' | 'review' | 'ready'


export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  tableId: string;
  projectId: string;
  executorId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleteAt: Date | null;
}