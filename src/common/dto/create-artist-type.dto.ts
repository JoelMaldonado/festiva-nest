import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
