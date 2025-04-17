import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { Club } from './club.entity';

@Entity('club_contact')
export class ClubContact {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, (club) => club.contacts)
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
