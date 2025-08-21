import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity({ name: 'event_schedule' })
export class EventScheduleEntity {
  @PrimaryColumn()
  event_id: number; // FK + PK

  @Column({ type: 'date' })
  event_date: Date; // YYYY-MM-DD

  @Column({ type: 'time' })
  start_time: string; // HH:mm:ss

  @OneToOne(() => EventEntity, (event) => event.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
