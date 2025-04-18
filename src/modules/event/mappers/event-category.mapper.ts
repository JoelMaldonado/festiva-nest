import { EventCategory } from '@entities/event-category.entity';

export function mapEventCategory(item: EventCategory) {
  return {
    id: item.id,
    title: item.title,
    idStatus: item.status.id,
  };
}
