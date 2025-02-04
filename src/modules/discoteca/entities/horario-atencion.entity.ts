import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Discoteca } from './discoteca.entity';

@Entity()
export class HorarioAtencion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    comment: '1: Lunes, 2: Martes, ..., 7: Domingo',
    unsigned: true,
  })
  dia: number;

  @Column({
    type: 'time',
  })
  hora_inicio: string;

  @Column({
    type: 'time',
  })
  hora_fin: string;

  @ManyToOne(() => Discoteca, (discoteca) => discoteca.horariosAtencion)
  discoteca: Discoteca;
}
