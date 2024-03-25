import { Injectable } from '@nestjs/common';

import { TableRepository } from '../repository';
import { CreateTableDto } from '../dtos';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  async createTable(table: CreateTableDto) {
    return await this.tableRepository.saveTable(table);
  }
}
