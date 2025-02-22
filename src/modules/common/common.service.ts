import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from '../evento/entities/evento.entity';
import { Like, Repository } from 'typeorm';
import { Artista } from '../artista/entities/artista.entity';
import { Discoteca } from '../discoteca/entities/discoteca.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Artista)
    private readonly artistaRepo: Repository<Artista>,
    @InjectRepository(Discoteca)
    private readonly discotecaRepo: Repository<Discoteca>,
  ) {}

  async search(query: string) {
    const searchTerm = `%${query}%`;

    const [eventos, artistas, clubs] = await Promise.all([
      this.eventoRepository.find({
        select: ['id', 'titulo'],
        where: {
          titulo: Like(searchTerm),
        },
        take: 5,
      }),
      this.artistaRepo.find({
        select: ['id', 'nombre'],
        where: {
          nombre: Like(searchTerm),
        },
        take: 5,
      }),
      this.artistaRepo.find({
        select: ['id', 'nombre'],
        where: {
          nombre: Like(searchTerm),
        },
        take: 5,
      }),
    ]);

    return [
      ...eventos.map((e) => ({ id: e.id, detail: e.titulo, type: 'E' })),
      ...artistas.map((a) => ({ id: a.id, detail: a.nombre, type: 'A' })),
      ...clubs.map((d) => ({ id: d.id, detail: d.nombre, type: 'C' })),
    ];
  }
}
