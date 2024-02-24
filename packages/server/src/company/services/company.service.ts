import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RequestContext } from '../../shared/request-context';

import { CompanyRepository } from '../repositories';
import { CompanyEntity } from '../entities';
import { CreateCompanyDto, OutputCompanyDto } from '../dtos';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}
  async createCompany(
    ctx: RequestContext,
    companyDto: CreateCompanyDto,
  ): Promise<CompanyEntity> {
    const company = plainToInstance(CompanyEntity, companyDto);

    return await this.companyRepository.saveCompany(company);
  }

  async getCompanyById(
    ctx: RequestContext,
    id: string,
  ): Promise<CompanyEntity> {
    return await this.companyRepository.getCompanyBuId(id);
  }

  async getCompanyByIdWithRelations(
    ctx: RequestContext,
    id: string,
  ): Promise<OutputCompanyDto> {
    const company =
      await this.companyRepository.getCompanyBuIdWithRelations(id);

    return plainToInstance(OutputCompanyDto, company);
  }
}