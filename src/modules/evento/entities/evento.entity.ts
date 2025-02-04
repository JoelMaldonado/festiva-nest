import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discoteca } from 'src/modules/discoteca/entities/discoteca.entity';
import { CatEvento } from 'src/modules/cat-evento/entities/cat-evento.entity';
import { EventoArtista } from './evento.artista';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  titulo: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  descrip: string;

  @Column({
    type: 'varchar',
    default: '',
    length: 255,
  })
  url_foto: string;

  @Column({
    type: 'date',
  })
  fecha: Date;

  @Column({
    type: 'time',
  })
  hora: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => CatEvento, (catEvento) => catEvento.eventos, { eager: true })
  categoria: CatEvento;

  @ManyToOne(() => Discoteca, (discoteca) => discoteca.eventos, { eager: true })
  discoteca: Discoteca;

  @OneToMany(() => EventoArtista, (eventoArtista) => eventoArtista.evento, {
    eager: true,
    cascade: ['remove'],
  })
  eventoArtistas: EventoArtista[];
}
