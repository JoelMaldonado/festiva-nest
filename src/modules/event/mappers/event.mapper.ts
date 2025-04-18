import { EventEntity } from '@entities/event.entity';

export function mapEvent(item: EventEntity) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    eventDatetime: item.eventDatetime,
    idClub: item.club?.id || null,
    nameClub: item.club?.name || null,
    idEventCategory: item.eventCategory?.id || null,
    idStatus: item.status?.id || null,
  };
}
