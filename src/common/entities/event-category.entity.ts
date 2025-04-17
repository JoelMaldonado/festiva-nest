import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event_category' })
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;
}
