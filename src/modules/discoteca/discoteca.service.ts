import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscotecaDto } from './dto/create-discoteca.dto';
import { UpdateDiscotecaDto } from './dto/update-discoteca.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { Discoteca } from './entities/discoteca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscotecaRedes } from './entities/discoteca-redes.entity';
import { RedesService } from '../redes/redes.service';
import { HorarioAtencion } from './entities/horario-atencion.entity';
import { Evento } from '../evento/entities/evento.entity';

@Injectable()
export class DiscotecaService {
  constructor(
    @InjectRepository(Discoteca)
    private readonly repo: Repository<Discoteca>,
    @InjectRepository(DiscotecaRedes)
    private readonly repoDiscotecaRedes: Repository<DiscotecaRedes>,
    @InjectRepository(HorarioAtencion)
    private readonly repoHorarioAtencion: Repository<HorarioAtencion>,

    private readonly redesService: RedesService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createDiscotecaDto: CreateDiscotecaDto) {
    try {
      const {
        redes = [],
        horariosAtencion = [],
        ...discotecaDetails
      } = createDiscotecaDto;

      await this.findOneByFilter('Nombre', { nombre: discotecaDetails.nombre });
      await this.findOneByFilter('Teléfono', { telf: discotecaDetails.telf });

      const discoteca = this.repo.create({
        ...discotecaDetails,
        discotecaRedes: await Promise.all(
          redes.map(async (red) => {
            const redFind = await this.redesService.findOne(red.idRed);
            return this.repoDiscotecaRedes.create({
              url: red.url,
              red: redFind,
            });
          }),
        ),
        horariosAtencion: horariosAtencion.map((horario) =>
          this.repoHorarioAtencion.create(horario),
        ),
      });
      await this.repo.save(discoteca);
      return discoteca;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    const res = await this.repo.find({
      relations: ['discotecaRedes.red'],
    });
    return res.map((discoteca) => {
      return {
        ...discoteca,
        discotecaRedes: discoteca.discotecaRedes.map((dr) => {
          return {
            url: dr.url,
            red: dr.red.nombre,
            cod: dr.red.cod,
            logo: dr.red.logo,
          };
        }),
      };
    });
  }

  async findOne(id: number) {
    const discoteca = await this.repo.findOne({
      relations: ['discotecaRedes.red'],
      where: { id },
    });
    if (!discoteca) throw new Error('Discoteca no encontrada');
    return discoteca;
  }

  async findOnePlane(id: number) {
    const discoteca = await this.repo.findOne({
      relations: ['discotecaRedes.red'],
      where: { id },
    });
    if (!discoteca) {
      throw new NotFoundException('Discoteca no encontrada');
    }
    return {
      ...discoteca,
      discotecaRedes: discoteca.discotecaRedes.map((dr) => {
        return {
          url: dr.url,
          red: dr.red.nombre,
          cod: dr.red.cod,
          logo: dr.red.logo,
        };
      }),
    };
  }

  async search(term: string) {
    const list = await this.repo.find({
      where: [{ nombre: Like(`%${term}%`) }],
      select: ['id', 'nombre', 'url_logo'],
      take: 10,
    });
    return list;
  }

  async update(id: number, updateDiscotecaDto: UpdateDiscotecaDto) {
    const { redes, horariosAtencion, ...discotecaDetails } = updateDiscotecaDto;

    const discoteca = await this.repo.preload({
      id: id,
      ...discotecaDetails,
    });

    if (!discoteca) throw new Error('Discoteca no encontrada');

    // Create Query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (redes) {
        await queryRunner.manager.delete(DiscotecaRedes, { discoteca: { id } });

        discoteca.discotecaRedes = await Promise.all(
          redes.map(async (red) => {
            const redFind = await this.redesService.findOne(red.idRed);
            return this.repoDiscotecaRedes.create({
              url: red.url,
              red: redFind,
            });
          }),
        );
      }
      if (horariosAtencion) {
        await queryRunner.manager.delete(HorarioAtencion, {
          discoteca: { id },
        });
        discoteca.horariosAtencion = horariosAtencion.map((horario) =>
          this.repoHorarioAtencion.create(horario),
        );
      }
      await queryRunner.manager.save(discoteca);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    const discoteca = await this.findOne(id);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(DiscotecaRedes, {
        discoteca: { id },
      });
      await queryRunner.manager.delete(HorarioAtencion, {
        discoteca: { id },
      });

      await queryRunner.manager.delete(Evento, {
        discoteca: { id },
      });

      await queryRunner.manager.remove(discoteca);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new Error(error.message);
    }
  }

  async findOneByFilter(nombre: string, params: any) {
    if (!nombre) throw new Error('El nombre del campo no puede estar vacio');
    const res = await this.repo.findOne({ where: { ...params } });
    if (res)
      throw new Error(`ya existe una discoteca con este parametro: ${nombre}`);
  }
}
