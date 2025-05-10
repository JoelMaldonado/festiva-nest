import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';

@Entity({ name: 'artist_tag' })
export class ArtistTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'artist_id', type: 'int' })
  artistId: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

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
