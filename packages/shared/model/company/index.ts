export interface Company {
  id: string;
  name: string;
  createdUseId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deleteAt: Date | null;
}

export interface CreateCompany {
  name: string;
}
