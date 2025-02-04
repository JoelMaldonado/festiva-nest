import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Repository } from 'typeorm';
import { Artista } from './entities/artista.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedesService } from '../redes/redes.service';
import { ArtistaRedes } from './entities/artista-redes.entity';

@Injectable()
export class ArtistaService {
  constructor(
    @InjectRepository(Artista)
    private readonly repo: Repository<Artista>,

    @InjectRepository(ArtistaRedes)
    private readonly repoArtistaRedes: Repository<ArtistaRedes>,
    private readonly redesService: RedesService,
  ) {}

  async create(dto: CreateArtistaDto) {
    // Verificar si todas las redes existen en paralelo
    const redes = await Promise.all(
      dto.redes.map(async (element) => {
        const red = await this.redesService.findOne(element.id_red);
        if (!red) {
          throw new NotFoundException(
            `Red con ID ${element.id_red} no encontrada`,
          );
        }
        return red; // Guardar la red para reutilizarla después
      }),
    );

    // Crear el artista
    const artista = this.repo.create(dto);
    await this.repo.save(artista);

    // Asignar las redes al artista
    const artistaRedesPromises = dto.redes.map((element, index) => {
      const artistaRedes = this.repoArtistaRedes.create({
        artista: artista,
        red: redes[index], // Utiliza la red ya obtenida antes
        url: element.url,
      });
      return this.repoArtistaRedes.save(artistaRedes);
    });

    await Promise.all(artistaRedesPromises);

    return this.findOne(artista.id);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['redes'],
    });
  }

  async findOne(id: number): Promise<Artista> {
    const artista = await this.repo.findOne({
      where: { id },
      relations: ['redes'],
    });
    if (!artista) {
      throw new NotFoundException(`Artista con ID ${id} no encontrado`);
    }
    return artista;
  }

  async update(id: number, dto: UpdateArtistaDto) {
    await this.findOne(id);
    const updateArtista = await this.repo.preload({ id, ...dto });
    if (!updateArtista) {
      throw new ConflictException(
        `No se pudo cargar los datos para actualizar`,
      );
    }
    try {
      // Guarda los cambios y maneja posibles errores internos
      await this.repo.save(updateArtista);

      if (dto.redes && dto.redes.length > 0) {
        // Eliminar redes sociales antiguas si es necesario
        await this.repoArtistaRedes.delete({ artista: { id } });

        // Verificar si todas las redes existen en paralelo
        const redes = await Promise.all(
          dto.redes.map(async (element) => {
            const red = await this.redesService.findOne(element.id_red);
            if (!red) {
              throw new NotFoundException(
                `Red con ID ${element.id_red} no encontrada`,
              );
            }
            return red; // Guardar la red para reutilizarla después
          }),
        );

        // Asignar las nuevas redes al artista
        const artistaRedesPromises = dto.redes.map((element, index) => {
          const artistaRedes = this.repoArtistaRedes.create({
            artista: updateArtista, // Usar el artista actualizado
            red: redes[index],
            url: element.url,
          });
          return this.repoArtistaRedes.save(artistaRedes);
        });

        await Promise.all(artistaRedesPromises);
        return this.findOne(id);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error actualizando el artista con ID ${id}`,
      );
    }
  }

  async remove(id: number) {
    // Verificar si el artista existe
    const artista = await this.findOne(id);

    try {
      // Eliminar las redes asociadas al artista si es necesario
      await this.repoArtistaRedes.delete({ artista: { id } });

      // Eliminar el artista
      await this.repo.remove(artista);
      return { message: `Artista con ID ${id} eliminado correctamente` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error eliminando el artista con ID ${id}`,
      );
    }
  }

  async removeAll() {
    try {
      // Eliminar todas las redes asociadas a todos los artistas
      await this.repoArtistaRedes.delete({});

      // Eliminar todos los artistas
      await this.repo.delete({});
      return { message: 'Todos los artistas eliminados correctamente' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error eliminando todos los artistas',
      );
    }
  }
}
