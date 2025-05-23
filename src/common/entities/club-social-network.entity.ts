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

  @JoinColumn({ name: 'club_id' })
  @ManyToOne(() => Club, (club) => club.clubSocialNetworks)
  club: Club;

  @JoinColumn({ name: 'social_network_id' })
  @ManyToOne(() => SocialNetwork, (sn) => sn.clubSocialNetworks)
  socialNetwork: SocialNetwork;

  @Column({ name: 'url', type: 'varchar', length: 255, nullable: true })
  url: string;

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
