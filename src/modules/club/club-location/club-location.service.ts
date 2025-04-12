import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubLocation } from '../entites/club-location.entity';
import { Repository } from 'typeorm';
import { ClubLocationDto } from '../dto/club-location.dto';

@Injectable()
export class ClubLocationService {
  constructor(
    @InjectRepository(ClubLocation)
    private readonly clubLocationRepo: Repository<ClubLocation>,
  ) {}

  async findLocationsById(id: number) {
    const items = await this.clubLocationRepo.find({
      where: {
        club: { id: id },
        status: { id: 1 },
      },
    });
    const map = items.map((e) => {
      return {
        id: e.id,
        address: e.address,
        latitude: Number(e.latitude),
        longitude: Number(e.longitude),
        mapsUrl: e.mapsUrl,
      };
    });
    return map;
  }

  async createLocation(id: number, dto: ClubLocationDto) {
    const location = this.clubLocationRepo.create({
      ...dto,
      club: { id: id },
    });
    await this.clubLocationRepo.save(location);
    return location;
  }

  async updateLocation(locationId: number, dto: ClubLocationDto) {
    const updatedLocation = await this.clubLocationRepo.preload({
      id: locationId,
      ...dto,
    });

    if (!updatedLocation) {
      throw new NotFoundException('Location not found');
    }

    return await this.clubLocationRepo.save(updatedLocation);
  }

  async deleteLocation(locationId: number) {
    const location = await this.clubLocationRepo.findOne({
      where: {
        id: locationId,
        status: {
          id: 1,
        },
      },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    const updateLocation = await this.clubLocationRepo.preload({
      id: locationId,
      status: { id: 2 },
    });

    if (!updateLocation) {
      throw new NotFoundException('Location not found');
    }

    return await this.clubLocationRepo.save(updateLocation);
  }
}
