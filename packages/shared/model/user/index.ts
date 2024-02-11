export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleteAt: Date | null;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  photo: string;
  createdByUserId: string | null;
}