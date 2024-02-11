export interface Table {
  id: string;
  name: string
  projectId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleteAt: Date | null;
}