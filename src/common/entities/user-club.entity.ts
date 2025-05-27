import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { User } from './user.entity';
import { Club } from './club.entity';

@Entity('user_club')
export class UserClubEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, { nullable: false })
  club: Club;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status, { nullable: false })
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
