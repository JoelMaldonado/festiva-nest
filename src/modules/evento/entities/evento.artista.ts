import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from './evento.entity';
import { Artista } from 'src/modules/artista/entities/artista.entity';

@Entity()
export class EventoArtista {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evento, (evento) => evento.eventoArtistas, {
    onDelete: 'CASCADE',
  })
  evento: Evento;

  @ManyToOne(() => Artista, (artista) => artista.eventos, {
    onDelete: 'CASCADE',
  })
  artista: Artista;
}
