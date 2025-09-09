import { EventEntity } from '@entities/event.entity';
import { format } from 'date-fns';

export function mapEvent(item: EventEntity) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    idClub: item.club?.id || null,
    nameClub: item.club?.name || null,
    idEventCategory: item.eventCategory?.id || null,
    nameEventCategory: item.eventCategory?.title || null,
    idStatus: item.status?.id || null,
    eventDate: item.schedule[0]?.eventDate || null,
    startTime: item.schedule[0]?.startTime || null,
  };
}
