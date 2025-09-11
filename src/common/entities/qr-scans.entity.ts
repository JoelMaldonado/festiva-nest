import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type PlatformType = 'android' | 'ios' | 'other';

@Entity('qr_scans')
export class QrScansEntity {

  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({
    type: 'enum',
    enum: ['android', 'ios', 'other'],
  })
  platform: PlatformType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
