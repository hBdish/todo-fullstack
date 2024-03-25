import { Task } from './types.ts';
import { makeAutoObservable } from 'mobx';

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
}

export { TaskStore };
