import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { TableService } from '../services';
import { JwtAuthGuard } from '../../auth/guards';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('workflow/:id')
  async patchWorkflowInTable(
    @Param('id') tableId: string,
    @Body() workflows: string[],
  ) {
    return await this.tableService.updateTableWorkflow(tableId, workflows);
  }
}
