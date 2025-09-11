import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('app_screens')
export class AppScreenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'screen_key', type: 'varchar', length: 100, nullable: false })
  screenKey: string;

  @Column({ name: 'is_active', type: 'tinyint', width: 1, default: 1 })
  isActive: boolean;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
