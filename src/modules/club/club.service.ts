import { Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubService {
  create(createClubDto: CreateClubDto) {
    return 'This action adds a new club';
  }

  async findAll() {
    return [
      {
        id: 1,
        name: 'Ibiza',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
        logo_url:
          'https://images-platform.99static.com/m4Y0Dy_qaqtAI5G1g7QhzmsWhZk=/0x0:1000x1000/500x500/top/smart/99designs-contests-attachments/115/115017/attachment_115017206',
        cover_url:
          'https://upload.wikimedia.org/wikipedia/commons/3/32/Wikipedia_space_ibiza%2803%29.jpg',
        google_maps_url: 'https://maps.app.goo.gl/wPAnPsezREnMG66GA',
        address: '546 España Avenue',
        phone_number: '+1-936-416-623',
        is_open: false,
      },
      {
        id: 2,
        name: 'Pacha',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        logo_url:
          'https://images-platform.99static.com/m4Y0Dy_qaqtAI5G1g7QhzmsWhZk=/0x0:1000x1000/500x500/top/smart/99designs-contests-attachments/115/115017/attachment_115017206',
        cover_url:
          'https://upload.wikimedia.org/wikipedia/commons/3/32/Wikipedia_space_ibiza%2803%29.jpg',
        google_maps_url: 'https://maps.app.goo.gl/wPAnPsezREnMG66GA',
        address: 'Av. España 546',
        phone_number: '936416623',
        is_open: true,
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} club`;
  }

  update(id: number, updateClubDto: UpdateClubDto) {
    return `This action updates a #${id} club`;
  }

  remove(id: number) {
    return `This action removes a #${id} club`;
  }
}
