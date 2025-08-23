import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Club } from './club.entity';

@Entity({ name: 'club_detail' })
export class ClubDetail {
  @PrimaryColumn({ name: 'club_id', type: 'int' })
  clubId: number;

  @OneToOne(() => Club, (club) => club.detail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @Column({
    name: 'google_place_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  googlePlaceId: string | null;

  @Column({
    name: 'google_rating',
    type: 'decimal',
    precision: 2,
    scale: 1,
    nullable: true,
  })
  googleRating: number | null;

  @Column({ name: 'google_user_ratings_total', type: 'int', nullable: true })
  googleUserRatingsTotal: number | null;

  @Column({ name: 'last_fetched', type: 'timestamp', nullable: true })
  lastFetched: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
