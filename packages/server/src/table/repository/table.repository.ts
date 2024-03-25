import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TableEntity } from '../entities';

@Injectable()
export class TableRepository extends Repository<TableEntity> {
  constructor(private dataSource: DataSource) {
    super(TableEntity, dataSource.createEntityManager());
  }

  async saveTable(table: TableEntity) {
    const savedTable = await this.save(table);

    if (!savedTable) {
      throw new NotFoundException(`Не удалось сохранить доску`);
    }

    return savedTable;
  }
}
