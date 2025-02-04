import { Controller, Get, Param } from '@nestjs/common';
import { RedesService } from './redes.service';

@Controller('redes')
export class RedesController {
  constructor(private readonly redesService: RedesService) {}

  @Get()
  findAll() {
    return this.redesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redesService.findOne(+id);
  }
}
