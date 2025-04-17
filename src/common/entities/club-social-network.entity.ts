import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { SocialNetwork } from './social-network.entity';
import { Club } from './club.entity';
import { Status } from './status.entity';

@Entity('club_social_network')
export class ClubSocialNetwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo_url: string;

  @JoinColumn({ name: 'social_network_id' })
  @ManyToOne(() => SocialNetwork, (sn) => sn.clubSocialNetworks)
  socialNetwork: SocialNetwork;

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, (club) => club.clubSocialNetworks)
  club: Club;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status)
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
