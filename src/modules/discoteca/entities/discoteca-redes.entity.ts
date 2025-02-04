import { Redes } from "src/modules/redes/entities/redes.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discoteca } from "./discoteca.entity";

@Entity()
export class DiscotecaRedes {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: 'varchar',
        nullable: false
    })
    url: string;

    @ManyToOne(
        () => Redes,
        redes => redes.discotecaRedes
    )
    red: Redes;

    @ManyToOne(
        () => Discoteca,
        discoteca => discoteca.discotecaRedes
    )
    discoteca: Discoteca
}