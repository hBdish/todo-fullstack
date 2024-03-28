import { Injectable } from '@nestjs/common';

import { TableRepository } from '../repository';
import { CreateTableDto } from '../dtos';
import { TableEntity } from '../entities';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  async createTable(table: CreateTableDto) {
    return await this.tableRepository.saveTable(table);
  }

  async getTableById(id: string) {
    return await this.tableRepository.getTableById(id);
  }

  async updateTable(table: TableEntity) {
    return await this.tableRepository.saveTable(table);
  }

  async updateTableWorkflow(tableId: string, workflow: string[]) {
    const table = await this.getTableById(tableId);

    table.workflow = workflow;

    return await this.updateTable(table);
  }
}
