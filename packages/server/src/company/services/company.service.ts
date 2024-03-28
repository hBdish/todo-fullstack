import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RequestContext } from '../../shared/request-context';

import { CompanyRepository } from '../repositories';
import { CompanyEntity } from '../entities';
import { CreateCompanyDto, OutputCompanyDto } from '../dtos';
import { UserEntity } from '../../user/entities';

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

  async deleteCompany(
    ctx: RequestContext,
    companyId: string,
  ): Promise<CompanyEntity> {
    return await this.companyRepository.deleteCompany(companyId);
  }

  async patchCompany(
    ctx: RequestContext,
    id: string,
    companyDto: CreateCompanyDto,
  ): Promise<OutputCompanyDto> {
    const localCompany = await this.getCompanyById(ctx, id);
    const company = plainToInstance(CompanyEntity, {
      ...localCompany,
      ...companyDto,
    });

    await this.companyRepository.saveCompany(company);

    return plainToInstance(OutputCompanyDto, company);
  }

  async patchCompaniesUsers(companyId: string, user: UserEntity) {
    const company = await this.getCompanyByIdWithRelations(null, companyId);

    const foundUser = company.user.find((u) => u.id === user.id);

    if (foundUser) {
      company.user = company.user.filter((u) => u.id !== foundUser.id);
    } else {
      company.user.push(user);
    }

    const savedCompany = await this.companyRepository.saveCompany(
      plainToInstance(CompanyEntity, company),
    );

    return plainToInstance(OutputCompanyDto, savedCompany);
  }

  async getCompanyById(
    ctx: RequestContext,
    id: string,
  ): Promise<CompanyEntity> {
    const company = await this.companyRepository.getCompanyBuId(id);

    return company;
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
