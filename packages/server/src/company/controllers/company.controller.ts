import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ReqContext, RequestContext } from '../../shared/request-context';
import { UuidValidationPipe } from '../../shared/pipes';

import { CreateCompanyDto, OutputCompanyDto } from '../dtos';
import { CompanyService } from '../services';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(
    @ReqContext() ctx: RequestContext,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<any> {
    return await this.companyService.createCompany(ctx, createCompanyDto);
  }

  @Get(':id')
  async getCompanyById(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<OutputCompanyDto> {
    return await this.companyService.getCompanyByIdWithRelations(ctx, id);
  }
}
