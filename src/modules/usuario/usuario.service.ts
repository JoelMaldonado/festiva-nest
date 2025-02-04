import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.repo.create(createUsuarioDto);
    if (!user)
      throw new InternalServerErrorException('Error al crear el usuario');
    await this.repo.save(user);
    return user;
  }

  async findAll() {
    return await this.repo.find({
      relations: ['tipoUser'],
    });
  }

  async findOneById(id: number) {
    const user = await this.repo.findOne({
      relations: ['tipoUser'],
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findOne(correo: string) {
    const user = await this.repo.findOne({
      relations: ['tipoUser'],
      where: { correo },
    });
    if (!user)
      throw new NotFoundException(`Usuario con correo ${correo} no encontrado`);

    return user;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
