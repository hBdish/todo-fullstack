import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TableEntity } from '../entities';

@Injectable()
export class TableRepository extends Repository<TableEntity> {
  constructor(private dataSource: DataSource) {
    super(TableEntity, dataSource.createEntityManager());
  }

  async getTableById(id: string) {
    const table = await this.findOne({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Не удалось найти доску с id ` + id);
    }

    return table;
  }

  async saveTable(table: TableEntity) {
    const savedTable = await this.save(table);

    if (!savedTable) {
      throw new NotFoundException(`Не удалось сохранить доску`);
    }

    return savedTable;
  }
}
