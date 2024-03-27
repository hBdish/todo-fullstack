import { Task } from './types.ts';
import { makeAutoObservable, runInAction } from 'mobx';
import { TaskService } from './task-service.ts';

class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  destroyTaskStore() {
    this.tasks = [];
  }

  // async
  async updateTask(task: Task) {
    console.log(task);

    const updatedTask = await TaskService.putTask(task);

    runInAction(() => {
      this.tasks = this.tasks.filter((t) => t.id !== updatedTask.id);

      this.tasks.push(updatedTask);
    });
  }
}

export { TaskStore };
