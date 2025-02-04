import { ArtistaRedes } from "src/modules/artista/entities/artista-redes.entity";
import { DiscotecaRedes } from "src/modules/discoteca/entities/discoteca-redes.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Redes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    nombre: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    cod: string;

    @Column({
        type: 'varchar',
        default: ''
    })
    logo: string;

    @OneToMany(
        () => DiscotecaRedes,
        discotecaRedes => discotecaRedes.red
    )
    discotecaRedes: DiscotecaRedes[];

    @OneToMany(
        () => ArtistaRedes,
        artistaRedes => artistaRedes.red
    )
    artistaRedes: ArtistaRedes[]
}