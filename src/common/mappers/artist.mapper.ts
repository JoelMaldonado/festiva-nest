import { ArtistSocialNetworkEntity } from '@entities/artist-social-network.entity';
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

export function mapperArtistSocialNetwork(item: ArtistSocialNetworkEntity) {
  return {
    id: item.id,
    url: item.url,
    socialNetwork: {
      id: item.socialNetwork.id,
      name: item.socialNetwork.name,
      logoUrl: item.socialNetwork.logoUrl,
    },
  };
}
