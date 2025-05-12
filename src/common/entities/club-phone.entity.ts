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

@Entity('club_phone')
@Index('idx_club_phone_club_id', ['club'])
export class ClubPhoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, (club) => club.phones)
  club: Club;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
