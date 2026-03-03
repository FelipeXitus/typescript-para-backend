import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AddressEntity from "./AddressEntity";
import PetEntity from "./PetEntity";

@Entity()
export default class AdopterEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    cpf: string;
    @Column()
    senha: string;
    @Column()
    celular: string;
    @Column()
    email: string;
    @Column({ nullable: true })
    foto?: string;
    @OneToOne(() => AddressEntity, { cascade: true, nullable: true, eager: true })
    @JoinColumn()
    endereco?: AddressEntity;
    @Column({ nullable: true })
    especieDePreferencia?: EnumEspecie;
    @OneToMany(() => PetEntity, pet => pet.adotante, { nullable: true, eager: true })
    pets!: PetEntity[];

    constructor(nome: string, cpf: string, senha: string, celular: string, email: string, foto?: string, endereco?: AddressEntity, especieDePreferencia?: EnumEspecie) {
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.celular = celular;
        this.email = email;
        this.foto = foto;
        this.endereco = endereco;
        this.especieDePreferencia = especieDePreferencia;
;
    }
}