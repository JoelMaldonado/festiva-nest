import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
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

  @IsDateString()
  eventDatetime: string;

  @IsInt()
  eventCategoryId: number;
}
