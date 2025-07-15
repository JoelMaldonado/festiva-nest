import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArtistType } from './artist-type.entity';
import { Status } from './status.entity';

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @JoinColumn({ name: 'artist_type_id' })
  @ManyToOne(() => ArtistType)
  artistType: ArtistType;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'biography', type: 'text', nullable: true })
  biography: string;

  @Column({ name: 'profile_url', type: 'varchar', length: 255, nullable: true })
  profileUrl: string;

  @Column({
    name: 'profile_2_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profile2Url: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
