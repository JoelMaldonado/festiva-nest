import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { Status } from './status.entity';
import { Club } from './club.entity';

@Entity('club_email')
@Index('idx_club_email_club_id', ['club'])
export class ClubEmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, (club) => club.contacts)
  club: Club;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
