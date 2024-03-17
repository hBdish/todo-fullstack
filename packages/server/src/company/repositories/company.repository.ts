import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CompanyRepositoryInterface } from '../interfaces';
import { CompanyEntity } from '../entities';
import { CreateCompanyDto, OutputCompanyDto } from '../dtos';

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

  async updateCompany(company: OutputCompanyDto): Promise<CompanyEntity> {
    const savedCompany = await this.save(company);

    if (!savedCompany) {
      throw new InternalServerErrorException(
        'Ошибка сохранения компании в Базе данных',
      );
    }

    return savedCompany;
  }

  async deleteCompany(id: string): Promise<CompanyEntity> {
    const company = await this.findOne({
      where: { id },
    });

    const deletedCompany = await this.delete(company);

    if (!deletedCompany) {
      throw new InternalServerErrorException('Ошибка удаления компании ');
    }

    return company;
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
        project: true,
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
