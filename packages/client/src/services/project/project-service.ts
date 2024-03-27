import { apiClient } from '../api-client';

import type { CreateProject, Project } from './types';

export class ProjectService {
  static getProject(id: string) {
    return apiClient.get<Project>(`projects/${id}`);
  }

  static postProject(project: CreateProject) {
    return apiClient.post<Project>(`projects`, project);
  }

  static patchProject(project: Project) {
    return apiClient.patch<Project>(`projects`, project);
  }

  static deleteProject(projectId: string) {
    return apiClient.delete<Project>(`projects/${projectId}`);
  }
}
