import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { ClubSocialNetwork } from 'src/modules/club/entites/club-social-network.entity';

@Entity('social_network')
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo_url: string;

  @ManyToOne(() => Status, (status) => status.socialNetworks)
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => ClubSocialNetwork, (csn) => csn.socialNetwork)
  clubSocialNetworks: ClubSocialNetwork[];
}
