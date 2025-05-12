import { ClubSchedule } from '@entities/club-schedule.entity';
import { ClubSocialNetwork } from '@entities/club-social-network.entity';
import { Club } from '@entities/club.entity';
import { map } from 'rxjs';

export function mapperClub(club: Club) {
  return {
    id: club.id,
    name: club.name,
    description: club.description,
    emails: club.emails.map((e) => e.email),
    phones: club.phones.map((p) => p.phone),
    logoUrl: club.logoUrl,
    covers: club.covers.map((c) => c.urlImage),
    address: club.locations.map((l) => {
      return {
        id: l.id,
        address: l.address,
        mapsUrl: l.mapsUrl,
        latitude: Number(l.latitude),
        longitude: Number(l.longitude),
      };
    }),
    schedules: club.clubSchedules.map(mapperClubSchedule),
    socialNetworks: club.clubSocialNetworks.map(mapperClubSocialNetwork),
  };
}

export function mapperClubSchedule(item: ClubSchedule) {
  const days = [
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miércoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' },
    { id: 7, name: 'Domingo' },
  ];
  return {
    id: item.id,
    dayOfWeek: item.dayOfWeek,
    name: days.find((day) => day.id === item.dayOfWeek)?.name,
    openingTime: item.openingTime,
    closingTime: item.closingTime,
  };
}

export function mapperClubSocialNetwork(item: ClubSocialNetwork) {
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
