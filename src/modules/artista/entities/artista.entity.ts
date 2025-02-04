import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistaRedes } from './artista-redes.entity';
import { EventoArtista } from 'src/modules/evento/entities/evento.artista';

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tipo: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  descrip: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  biografia: string;

  @Column({
    type: 'text',
  })
  tags: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  url_foto: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  url_foto2: string;

  @OneToMany(() => ArtistaRedes, (artRed) => artRed.artista)
  redes: ArtistaRedes[];

  @OneToMany(() => EventoArtista, (eventoArtista) => eventoArtista.artista)
  eventos: EventoArtista[];
}
