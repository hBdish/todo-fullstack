import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CompanyRepositoryInterface } from '../interfaces';
import { CompanyEntity } from '../entities';

@Injectable()
export class CompanyRepository
  extends Repository<CompanyEntity>
  implements CompanyRepositoryInterface
{
  constructor(private dataSource: DataSource) {
    super(CompanyEntity, dataSource.createEntityManager());
  }
  async saveCompany(company: CompanyEntity): Promise<CompanyEntity> {
    const savedCompany = await this.save(company);

    if (!savedCompany) {
      throw new InternalServerErrorException(
        'Ошибка сохранения компании в Базе данных',
      );
    }

    return savedCompany;
  }

  async getCompanyBuId(id: string): Promise<CompanyEntity> {
    const company = await this.findOne({
      where: {
        id,
      },
    });

    if (!company) {
      throw new InternalServerErrorException(
        'Ошибка получения компании в Базе данных',
      );
    }

    return company;
  }

  async getCompanyBuIdWithRelations(id: string): Promise<CompanyEntity> {
    const company = await this.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!company) {
      throw new InternalServerErrorException(
        'Ошибка получения компании в Базе данных',
      );
    }

    return company;
  }
}
