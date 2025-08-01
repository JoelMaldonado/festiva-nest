import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from 'src/common/entities/club.entity';

@Entity('status')
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  description: string;

  // Relaciones inversas
  @OneToMany(() => Club, (club) => club.status)
  clubs: Club[];
}
