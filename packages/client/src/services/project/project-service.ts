import { apiClient } from '../api-client';
import type { Project } from './types';

export class ProjectService {
  static getProject(id: string) {
    return apiClient.get<Project>(`projects/${id}`);
  }
}
