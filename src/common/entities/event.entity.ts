import { Club } from 'src/common/entities/club.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { EventArtist } from './event-artist.entity';
import { Status } from './status.entity';

@Entity({ name: 'event' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club)
  club: Club;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'image_url', type: 'varchar', length: 255 })
  imageUrl: string;

  @JoinColumn({ name: 'event_category_id' })
  @ManyToOne(() => CategoryEntity)
  eventCategory: CategoryEntity;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => EventArtist, (ea) => ea.event)
  eventArtists: EventArtist[];

  @OneToMany(() => EventScheduleEntity, (es) => es.event)
  schedule: EventScheduleEntity[];
}

@Entity({ name: 'event_schedule' })
export class EventScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventEntity, (event) => event.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @Column({ name: 'event_date', type: 'date' })
  eventDate: Date; // YYYY-MM-DD

  @Column({ name: 'start_time', type: 'time' })
  startTime: string; // HH:mm:ss

  @Column({ name: 'status_id', default: 1 })
  statusId: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
