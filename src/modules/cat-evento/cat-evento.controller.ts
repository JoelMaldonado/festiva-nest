import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatEventoService } from './cat-evento.service';
import { CreateCatEventoDto } from './dto/create-cat-evento.dto';
import { UpdateCatEventoDto } from './dto/update-cat-evento.dto';

@Controller('cat-evento')
export class CatEventoController {
  constructor(private readonly catEventoService: CatEventoService) {}

  @Post()
  create(@Body() createCatEventoDto: CreateCatEventoDto) {
    return this.catEventoService.create(createCatEventoDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.catEventoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catEventoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatEventoDto: UpdateCatEventoDto) {
    return this.catEventoService.update(+id, updateCatEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catEventoService.remove(+id);
  }
}
