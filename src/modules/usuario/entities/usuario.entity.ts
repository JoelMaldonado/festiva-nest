import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TipoUser } from './tipo-user.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  nombre: string;

  @Column({
    type: 'varchar',
  })
  apellidos: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  correo: string;

  @Column({
    type: 'varchar',
  })
  clave: string;

  @Column({
    type: 'date',
  })
  fecha_nac: Date;

  @Column({
    type: 'varchar',
    unique: true,
  })
  telf: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  url?: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => TipoUser, (tipoUser) => tipoUser.usuarios)
  tipoUser: TipoUser;
}
