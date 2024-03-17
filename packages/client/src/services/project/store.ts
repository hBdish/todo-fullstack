import type { Project } from './types';
import { makeAutoObservable, runInAction } from 'mobx';
import { ProjectService } from './project-service.ts';

class ProjectStore {
  project?: Project;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // async
  async getProjectData(id: string) {
    if (!id) return;

    this.isLoading = true;

    const project = await ProjectService.getProject(id);

    runInAction(() => {
      this.isLoading = false;
      this.project = project;
    });
  }
}

export { ProjectStore };
