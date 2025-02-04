import { Redes } from "src/modules/redes/entities/redes.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artista } from "./artista.entity";

@Entity()
export class ArtistaRedes {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: 'varchar',
        nullable: false
    })
    url: string;

    @ManyToOne(
        () => Redes,
        redes => redes.artistaRedes
    )
    red: Redes;

    @ManyToOne(
        () => Artista,
        art => art.redes
    )
    artista: Artista
}