import { ClubSchedule } from '@entities/club-schedule.entity';
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
