import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";
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
    porte: EnumPorte;
    @Column()
    dataDeNascimento: Date;
    @Column()
    adotado: boolean;
    @ManyToOne(() => AdopterEntity, adotante => adotante.pets, { cascade: true, nullable: true })
    adotante?: AdopterEntity;

    constructor(nome: string, especie: EnumEspecie, porte: EnumPorte, dataDeNascimento: Date, adotado: boolean, adotante?: AdopterEntity) {
        this.nome = nome;
        this.especie = especie;
        this.porte = porte;
        this.dataDeNascimento = dataDeNascimento;
        this.adotado = adotado;
        this.adotante = adotante;
    }
}
