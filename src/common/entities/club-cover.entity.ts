import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { Status } from './status.entity';

@Entity('club_cover')
export class ClubCover {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'url_image', type: 'varchar', length: 255, nullable: true })
  urlImage: string;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, (club) => club.covers)
  club: Club;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
