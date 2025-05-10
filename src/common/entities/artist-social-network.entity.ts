import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SocialNetwork } from './social-network.entity';
import { Status } from './status.entity';
import { Artist } from './artist.entity';

@Entity({ name: 'artist_social_network' })
export class ArtistSocialNetworkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'artist_id' })
  @ManyToOne(() => Artist)
  artist: Artist;

  @Column({ name: 'url', type: 'varchar', length: 255 })
  url: string;

  @JoinColumn({ name: 'social_network_id' })
  @ManyToOne(() => SocialNetwork)
  socialNetwork: SocialNetwork;

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
