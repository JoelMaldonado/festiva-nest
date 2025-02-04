import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity()
export class TipoUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    nombre: string;

    @OneToMany(
        () => Usuario,
        usuario => usuario.tipoUser
    )
    usuarios: Usuario[];
}