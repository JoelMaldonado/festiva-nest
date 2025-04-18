import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from 'src/common/entities/artist.entity';
import { Status } from './status.entity';
import { EventEntity } from './event.entity';

@Entity({ name: 'event_artist' })
export class EventArtist {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'event_id' })
  @ManyToOne(() => EventEntity, (e) => e.eventArtists)
  event: Event;

  @JoinColumn({ name: 'artist_id' })
  @ManyToOne(() => Artist)
  artist: Artist;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
