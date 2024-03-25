import { Table } from './types.ts';
import { makeAutoObservable } from 'mobx';

class TableStore {
  activeTable: Table | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTable(table: Table | undefined) {
    this.activeTable = table;
  }

  destroyTableStore() {
    this.activeTable = undefined;
  }
}

export { TableStore };
