export interface Project {
  id: string;
  name: string;
  type: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleteAt: Date | null;
}