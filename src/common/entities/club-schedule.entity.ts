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

@Entity({ name: 'club_schedule' })
export class ClubSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club)
  club: Club;

  @Column({ name: 'day_of_week', type: 'tinyint' })
  dayOfWeek: number;

  @Column({ name: 'opening_time', type: 'time' })
  openingTime: string;

  @Column({ name: 'closing_time', type: 'time' })
  closingTime: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
