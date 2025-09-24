import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'event_category' })
export class EventCategoryEntity {
  @PrimaryColumn({ name: 'event_id', type: 'int' })
  eventId: number;

  @PrimaryColumn({ name: 'category_id', type: 'int' })
  categoryId: number;

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

  @ManyToOne(() => EventEntity, (event) => event.eventCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.eventCategories)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
