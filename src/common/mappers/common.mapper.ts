import { SocialNetwork } from '@entities/social-network.entity';

export function toSocialNetworkResponse(item: SocialNetwork) {
  return {
    id: item.id,
    name: item.name,
    logoUrl: item.logoUrl,
    idStatus: item.status.id,
  };
}
