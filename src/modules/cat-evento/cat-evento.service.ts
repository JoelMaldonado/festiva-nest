import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatEventoDto } from './dto/create-cat-evento.dto';
import { UpdateCatEventoDto } from './dto/update-cat-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatEvento } from './entities/cat-evento.entity';

@Injectable()
export class CatEventoService {
  constructor(
    @InjectRepository(CatEvento)
    private readonly repo: Repository<CatEvento>,
  ) {}

  async create(createCatEventoDto: CreateCatEventoDto) {
    const catEVento = this.repo.create(createCatEventoDto);
    if (!catEVento)
      throw new InternalServerErrorException('No se pudo crear la categoria');

    const nombreEvento = await this.repo.findOne({
      where: { nombre: catEVento.nombre },
    });

    if (nombreEvento)
      throw new ConflictException('El nombre de la categoria ya existe');

    await this.repo.save(catEVento);
    return catEVento;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const catEvento = await this.repo.findOne({ where: { id } });
    if (!catEvento) throw new NotFoundException('La categoria no existe');

    return catEvento;
  }

  async update(id: number, updateCatEventoDto: UpdateCatEventoDto) {
    await this.findOne(id);
    const preload = await this.repo.preload({
      id: id,
      ...updateCatEventoDto,
    });

    if (!preload)
      throw new InternalServerErrorException('No se pudo actualizar el evento');

    //Verificar que el nombre no sea duplicado
    const nombreEvento = await this.repo.findOne({
      where: { nombre: preload.nombre },
    });
    
    if (nombreEvento) throw new ConflictException('El nombre ya existe');

    await this.repo.save(preload);
    return preload;
  }

  async remove(id: number) {
    const catEvento = await this.findOne(id);
    await this.repo.delete(catEvento);
    return;
  }
}
