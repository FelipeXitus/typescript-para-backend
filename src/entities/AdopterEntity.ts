import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AddressEntity from "./AddressEntity";

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

    constructor(nome: string, cpf: string, senha: string, celular: string, email: string, foto?: string, endereco?: AddressEntity, especieDePreferencia?: EnumEspecie) {
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.celular = celular;
        this.email = email;
        this.foto = foto;
        this.endereco = endereco;
        this.especieDePreferencia = especieDePreferencia;
    }
}