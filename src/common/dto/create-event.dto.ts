import {
  IsDateString,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateEventDto {
  @IsInt()
  clubId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  // Solo YYYY-MM-DD
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'eventDate must be in format YYYY-MM-DD',
  })
  eventDate: string;

  // Solo HH:mm o HH:mm:ss
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'startTime must be in format HH:mm or HH:mm:ss',
  })
  startTime: string;

  @IsInt()
  eventCategoryId: number;
}
