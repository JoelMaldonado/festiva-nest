import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { ArtistaService } from './artista.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('artista')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistaService.create(createArtistaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.artistaService.findAll();
  }

  @Get('test')
  findAllTest() {
    return this.artistaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistaService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistaService.update(+id, updateArtistaDto);
  }

  @UseGuards(AuthGuard)
  @Delete('all')
  removeAll() {
    return this.artistaService.removeAll();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const idArtista = Number(id);
    if (isNaN(idArtista)) {
      throw new ConflictException('El ID debe ser un número');
    }
    return this.artistaService.remove(idArtista);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    
    const fs = require('fs');
    const nombreArchivo = new Date().getTime() + '.jpg';
    fs.writeFileSync(`assets/images/${nombreArchivo}`, file.buffer);
    return nombreArchivo;
  }
}
