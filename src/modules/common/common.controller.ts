import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('search')
  search(@Query('q') query: string) {
    if(!query) {
      throw new BadRequestException('Debe proporcionar un término de búsqueda');
    }
    return this.commonService.search(query);
  }
}
