import { Task } from '@services';
import { apiClient } from '../api-client';
import { CreateTask } from './types.ts';

export class TaskService {
  static putTask(task: Task) {
    return apiClient.patch<Task>('/tasks', task);
  }

  static postTask(createTaskDto: CreateTask) {
    return apiClient.post<Task>('/tasks', createTaskDto);
  }

  static deleteTask(id: string) {
    return apiClient.delete<Task>(`/tasks/${id}`);
  }

  static closeSprint(tasks: Task[]) {
    return apiClient.post<
      {
        name: string;
        wait: number;
        inWork: number;
        done: number;
        imposible: number;
      }[]
    >(`/tasks/close-sprint`, tasks);
  }
}
