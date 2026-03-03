import AdopterEntity from "../../entities/AdopterEntity";
import AddressEntity from "../../entities/AddressEntity";

export default interface InterfaceAdopterRepository {
    criaAdotante(adopter: AdopterEntity): Promise<AdopterEntity>;
    buscaAdotantePorId(id: number): Promise<AdopterEntity | null>;
    buscaAdotantePorCpf(cpf: string): Promise<AdopterEntity | null>;
    buscaAdotantePorParametro(param: string): Promise<AdopterEntity[]>;
    listaAdotantes(): Promise<AdopterEntity[]>;
    deletaAdotante(id: number): Promise<void>;
    atualizaAdotante(adopter: AdopterEntity): Promise<AdopterEntity>;
    atualizaEnderecoAdotante(idAdotante:number,endereco: AddressEntity): Promise<AdopterEntity>;
}