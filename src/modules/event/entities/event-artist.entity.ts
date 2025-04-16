import { Status } from 'src/modules/common/entities/status.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Artist } from 'src/common/entities/artist.entity';

@Entity({ name: 'event_artist' })
export class EventArtist {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'event_id' })
  @ManyToOne(() => Event, (e) => e.eventArtists)
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
