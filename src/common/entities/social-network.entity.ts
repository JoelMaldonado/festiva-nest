import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClubSocialNetwork } from 'src/common/entities/club-social-network.entity';

@Entity('social_network')
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @OneToMany(() => ClubSocialNetwork, (csn) => csn.socialNetwork)
  clubSocialNetworks: ClubSocialNetwork[];
}
