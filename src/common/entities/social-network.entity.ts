import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { ClubSocialNetwork } from 'src/common/entities/club-social-network.entity';

@Entity('social_network')
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ name: 'logo_url', type: 'varchar', length: 255, nullable: true })
  logoUrl: string;

  @Column({ name: 'image_path', type: 'varchar', length: 255, nullable: true })
  imagePath: string;

  @JoinColumn({ name: 'status_id' })
  @ManyToOne(() => Status, (status) => status.socialNetworks)
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

  @OneToMany(() => ClubSocialNetwork, (csn) => csn.socialNetwork)
  clubSocialNetworks: ClubSocialNetwork[];
}
