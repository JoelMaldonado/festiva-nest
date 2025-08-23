import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ClubCover } from './club-cover.entity';
import { ClubLocation } from './club-location.entity';
import { ClubSocialNetwork } from './club-social-network.entity';
import { Status } from './status.entity';
import { ClubEmailEntity } from './club-email.entity';
import { ClubPhoneEntity } from './club-phone.entity';
import { ClubSchedule } from './club-schedule.entity';
import { ClubDetail } from './club-detail.entity';

@Entity({ name: 'club' })
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'logo_url', type: 'varchar', length: 255, nullable: true })
  logoUrl: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status, (status) => status.clubs)
  status: Status;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => ClubCover, (cover) => cover.club)
  covers: ClubCover[];

  @OneToMany(() => ClubEmailEntity, (contact) => contact.club)
  emails: ClubEmailEntity[];

  @OneToMany(() => ClubPhoneEntity, (phone) => phone.club)
  phones: ClubPhoneEntity[];

  @OneToMany(() => ClubLocation, (location) => location.club)
  locations: ClubLocation[];

  @OneToMany(() => ClubSchedule, (schedule) => schedule.club)
  clubSchedules: ClubSchedule[];

  @OneToMany(() => ClubSocialNetwork, (csn) => csn.club)
  clubSocialNetworks: ClubSocialNetwork[];

  @OneToOne(() => ClubDetail, (detail) => detail.club)
  detail: ClubDetail;
}
