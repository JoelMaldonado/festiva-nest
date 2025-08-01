import { ArtistSocialNetworkEntity } from '@entities/artist-social-network.entity';
import { Artist } from '@entities/artist.entity';

export function toArtistResponse(item: Artist) {
  return {
    id: item.id,
    name: item.name,
    artistType: item.artistType.name,
    description: item.description,
    biography: item.biography,
    tags: 'Rock',
    profileUrl: item.profileUrl,
    profileCoverUrl: item.profile2Url,
    socialNetworks: item.socialNetworks.map(mapperArtistSocialNetwork),
  };
}

export function mapperArtistSocialNetwork(item: ArtistSocialNetworkEntity) {
  return {
    id: item.id,
    url: item.url,
    code: item.socialNetwork.code,
    name: item.socialNetwork.name,
  };
}
