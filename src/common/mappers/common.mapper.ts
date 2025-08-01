import { SocialNetwork } from '@entities/social-network.entity';

export function toSocialNetworkResponse(item: SocialNetwork) {
  return {
    id: item.id,
    code: item.code,
    name: item.name,
  };
}
