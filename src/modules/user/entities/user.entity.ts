import { Status } from 'src/modules/common/entities/status.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'user_role_id' })
  @ManyToOne(() => UserRole)
  userRole: UserRole;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
