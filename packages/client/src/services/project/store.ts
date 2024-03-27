import type { Project } from './types';
import { makeAutoObservable, runInAction } from 'mobx';
import { ProjectService } from './project-service.ts';
import { CreateProject } from './types';

class ProjectStore {
  project?: Project;
  isLoading = false;

  projectForm: CreateProject = {
    companyId: '',
    name: '',
    photo: '',
    type: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setProjectForm = <T extends keyof CreateProject>(
    field: T,
    value: CreateProject[T],
  ) => {
    this.projectForm[field] = value;
  };

  // async

  async postProject() {
    await ProjectService.postProject(this.projectForm);
  }

  async patchProject(project: Project) {
    await ProjectService.patchProject(project);
  }

  async deleteProject(projectId: string) {
    await ProjectService.deleteProject(projectId);
  }

  async getProjectData(id: string) {
    this.isLoading = true;

    if (!id) return;

    const project = await ProjectService.getProject(id);

    runInAction(() => {
      this.isLoading = false;
      this.project = project;
    });
  }
}

export { ProjectStore };
