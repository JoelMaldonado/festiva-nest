import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { DiscotecaService } from './discoteca.service';
import { CreateDiscotecaDto } from './dto/create-discoteca.dto';
import { UpdateDiscotecaDto } from './dto/update-discoteca.dto';

@Controller('discoteca')
export class DiscotecaController {
  constructor(private readonly discotecaService: DiscotecaService) {}

  @Post()
  create(@Body() createDiscotecaDto: CreateDiscotecaDto) {
    return this.discotecaService.create(createDiscotecaDto);
  }

  @Get()
  findAll() {
    return this.discotecaService.findAll();
  }

  @Get("search")
  search(@Query("term") term: string) {
    return this.discotecaService.search(term);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.discotecaService.findOnePlane(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscotecaDto: UpdateDiscotecaDto) {
    return this.discotecaService.update(+id, updateDiscotecaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discotecaService.remove(+id);
  }
}
