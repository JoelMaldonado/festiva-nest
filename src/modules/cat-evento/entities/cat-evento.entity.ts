import { Evento } from "src/modules/evento/entities/evento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CatEvento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    nombre: string;

    @OneToMany(
        () => Evento,
        evento => evento.categoria
    )
    eventos: Evento[]
}