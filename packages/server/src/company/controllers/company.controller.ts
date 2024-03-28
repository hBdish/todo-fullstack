import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ReqContext, RequestContext } from '../../shared/request-context';
import { UuidValidationPipe } from '../../shared/pipes';

import { CreateCompanyDto, OutputCompanyDto } from '../dtos';
import { CompanyService } from '../services';
import { JwtAuthGuard } from '../../auth/guards';
import { CompanyEntity } from '../entities';
import { UserEntity } from '../../user/entities';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCompany(
    @ReqContext() ctx: RequestContext,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<any> {
    return await this.companyService.createCompany(ctx, createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCompanyById(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<OutputCompanyDto> {
    return await this.companyService.getCompanyByIdWithRelations(ctx, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchCompanyById(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) id: string,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<OutputCompanyDto> {
    return await this.companyService.patchCompany(ctx, id, createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:id')
  async patchCompanyUserById(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) id: string,
    @Body() user: UserEntity,
  ): Promise<OutputCompanyDto> {
    return await this.companyService.patchCompaniesUsers(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCompanyById(
    @ReqContext() ctx: RequestContext,
    @Param('id', UuidValidationPipe) id: string,
  ): Promise<CompanyEntity> {
    return await this.companyService.deleteCompany(ctx, id);
  }
}
