import { Task } from '@services';
import { apiClient } from '../api-client';

export class TaskService {
  static putTask(task: Task) {
    return apiClient.patch<Task>('/tasks', task);
  }
}
