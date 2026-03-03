import { Repository } from "typeorm";
import AdopterEntity from "../entities/AdopterEntity";
import InterfaceAdopterRepository from "./interfaces/InterfaceAdopterRepository";
import AddressEntity from "../entities/AddressEntity";

export default class AdopterRepository implements InterfaceAdopterRepository {
    private repository: Repository<AdopterEntity>;
    constructor(repository: Repository<AdopterEntity>) {
        this.repository = repository;
    }
    async criaAdotante(adopter: AdopterEntity): Promise<AdopterEntity> {
        return await this.repository.save(adopter);
    }
    async buscaAdotantePorId(id: number): Promise<AdopterEntity | null> {
        return await this.repository.findOneBy({ id });
    }
    async buscaAdotantePorCpf(cpf: string): Promise<AdopterEntity | null> {
        return await this.repository.findOneBy({ cpf });
    }
    async buscaAdotantePorParametro(param: string): Promise<AdopterEntity[]> {
        return await this.repository.findBy({ [param]: param });
    }
    async listaAdotantes(): Promise<AdopterEntity[]> {
        return await this.repository.find();
    }
    async deletaAdotante(id: number): Promise<void> {
        await this.repository.delete(id);
    }
    async atualizaAdotante(adopter: AdopterEntity): Promise<AdopterEntity> {
        return await this.repository.save(adopter);
    }
    async atualizaEnderecoAdotante(idAdotante: number, endereco: AddressEntity): Promise<AdopterEntity> {
        const adopter = await this.repository.findOne({ where: { id: idAdotante } });
        if (!adopter) {
            throw new Error("Adotante não encontrado");
        }
        const novoEndereco = new AddressEntity(endereco.logradouro, endereco.numero, endereco.cidade, endereco.estado, endereco.cep, endereco.complemento);
        adopter.endereco = novoEndereco;
        return await this.repository.save(adopter);
    }
}