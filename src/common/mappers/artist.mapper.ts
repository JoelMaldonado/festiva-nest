import { Artist } from '@entities/artist.entity';

export function toArtistResponse(item: Artist) {
  return {
    id: item.id,
    name: item.name,
    artistType: 'Singer',
    description: item.description,
    biography: item.biography,
    tags: 'Pop, Rock',
    profileUrl: item.profileUrl,
    profileCoverUrl: item.profileUrl,
    socialNetworks: [],
  };
}
