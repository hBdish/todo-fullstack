import { UserEntity } from '../entities';

export interface UsersRepositoryInterface {
  getById: (id: string) => Promise<UserEntity> | null;
  getByEmail: (email: string) => Promise<UserEntity | null>;
  saveUser: (user: UserEntity) => Promise<UserEntity> | null;
  getAllUsers: (parentId?: string) => Promise<UserEntity[]>;
  deleteUser: (user: UserEntity) => Promise<UserEntity>;
}
