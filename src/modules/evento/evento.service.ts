import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEventoService } from '../cat-evento/cat-evento.service';
import { DiscotecaService } from '../discoteca/discoteca.service';
import { ArtistaService } from '../artista/artista.service';
import { EventoArtista } from './entities/evento.artista';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly repo: Repository<Evento>,
    @InjectRepository(EventoArtista)
    private readonly repoEventoArtista: Repository<EventoArtista>,
    private readonly categoriaService: CatEventoService,
    private readonly discotecaService: DiscotecaService,
    private readonly artistaService: ArtistaService,
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    const categoria = await this.categoriaService.findOne(
      createEventoDto.idCategoria,
    );
    
    const discoteca = await this.discotecaService.findOne(
      createEventoDto.idDiscoteca,
    );

    const artistas = await Promise.all(
      createEventoDto.artistas.map((id) => this.artistaService.findOne(id)),
    );

    const evento = this.repo.create({
      ...createEventoDto,
      categoria,
      discoteca,
    });

    await this.repo.save(evento);
    const listEventoArtista = artistas.map((artista) => {
      return this.repoEventoArtista.create({
        artista,
        evento,
      });
    });

    await this.repoEventoArtista.save(listEventoArtista);
    return await this.findOne(evento.id);
  }

  async findAll() {
    const res = await this.repo.find({
      relations: ['eventoArtistas', 'eventoArtistas.artista'],
    });
    const map = res.map(evento => {
      return {
        ...evento,
        eventoArtistas: evento.eventoArtistas.map((ea) => ea.artista)
      }
    });
    return map;
  }

  async findAllPlane() {
    const list = await this.findAll();

    return list.map((evento) => ({
      ...evento,
      categoria: evento.categoria.nombre,
    }));
  }

  async findOne(id: number) {
    const evento = await this.repo.findOne({ where: { id } });
    if (!evento) {
      throw new Error('Evento no encontrado');
    }
    return evento;
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return `This action updates a #${id} evento`;
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
