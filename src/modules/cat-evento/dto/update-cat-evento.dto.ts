import { PartialType } from '@nestjs/mapped-types';
import { CreateCatEventoDto } from './create-cat-evento.dto';

export class UpdateCatEventoDto extends PartialType(CreateCatEventoDto) {}
