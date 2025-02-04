import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DiscotecaRedes } from './discoteca-redes.entity';
import { HorarioAtencion } from './horario-atencion.entity';
import { Evento } from 'src/modules/evento/entities/evento.entity';

@Entity()
export class Discoteca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    default: '',
    length: 1000,
  })
  descrip: string;

  @Column({
    type: 'varchar',
    default: '',
    length: 255,
  })
  url_logo: string;

  @Column({
    type: 'varchar',
    default: '',
    length: 255,
  })
  url_portada: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  direc: string;

  @Column({
    type: 'varchar',
    default: '',
    length: 255,
  })
  url_maps: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  telf: string;

  @OneToMany(
    () => DiscotecaRedes,
    (discotecaRedes) => discotecaRedes.discoteca,
    { cascade: true },
  )
  discotecaRedes: DiscotecaRedes[];

  @OneToMany(
    () => HorarioAtencion,
    (horarioAtencion) => horarioAtencion.discoteca,
    {
      cascade: true
    },
  )
  horariosAtencion: HorarioAtencion[];

  @OneToMany(() => Evento, (ev) => ev.discoteca, {
    cascade: ['remove'],
  })
  eventos: Evento[];
}
