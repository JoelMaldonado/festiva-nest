import { Status } from 'src/modules/common/entities/status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  // ArtistType

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'biography', type: 'text', nullable: true })
  biography: string;

  @Column({ name: 'profile_url', type: 'varchar', length: 255, nullable: true })
  profileUrl: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
