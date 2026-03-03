import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdopterEntity from "./AdopterEntity";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    especie: EnumEspecie;
    @Column()
    dataDeNascimento: Date;
    @Column()
    adotado: boolean;
    @ManyToOne(() => AdopterEntity, adotante => adotante.pets, { cascade: true, nullable: true })
    adotante?: AdopterEntity;

    constructor(nome: string, especie: EnumEspecie, dataDeNascimento: Date, adotado: boolean, adotante?: AdopterEntity) {
        this.nome = nome;
        this.especie = especie;
        this.dataDeNascimento = dataDeNascimento;
        this.adotado = adotado;
        this.adotante = adotante;
    }
}
