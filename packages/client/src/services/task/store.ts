import { makeAutoObservable, runInAction } from 'mobx';

import { CreateTask, Task } from './types.ts';
import { TaskService } from './task-service.ts';

class TaskStore {
  tasks: Task[] = [];
  createTaskData: CreateTask = {
    task: {
      name: '',
      description: '',
      status: '',
    },
    table: {
      id: '',
      name: '',
      workflow: [],
      createdAt: '',
      updatedAt: '',
      deleteAt: '',
    },
    project: {
      id: '',
      createdAt: '',
      updatedAt: '',
      deleteAt: '',
      name: '',
      photo: '',
      type: '',
      table: {
        id: '',
        name: '',
        workflow: [],
        createdAt: '',
        updatedAt: '',
        deleteAt: '',
      },
      task: [],
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  setCreateTaskData = <T extends keyof CreateTask>(
    field: T,
    value: CreateTask[T],
  ) => {
    this.createTaskData[field] = value;
  };

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  destroyTaskStore() {
    this.tasks = [];
  }

  // async

  async postTask() {
    const task = await TaskService.postTask(this.createTaskData);

    runInAction(() => {
      this.tasks.push(task);
    });
  }

  async deleteTask(id: string) {
    const deletedTask = await TaskService.deleteTask(id);

    runInAction(() => {
      this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
    });
  }

  async updateTask(task: Task) {
    const updatedTask = await TaskService.putTask(task);

    runInAction(() => {
      this.tasks = this.tasks.map((t) => {
        if (t.id === updatedTask.id) return updatedTask;

        return t;
      });
    });
  }
}

export { TaskStore };
