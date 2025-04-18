import { Club } from '@entities/club.entity';

export function toClubResponse(club: Club) {
  return {
    id: club.id,
    name: club.name,
    description: club.description,
    phone: '',
    logoUrl: club.logoUrl,
    coverUrl: '',
    address: '',
    mapsUrl: '',
  };
}
