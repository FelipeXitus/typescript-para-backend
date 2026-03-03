import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";
import PetType from "../../types/PetType";

export default interface InterfacePetRepository {
    criaPet(pet: PetType): void | Promise<void>;
    listaPets(): Array<PetType> | Promise<Array<PetType>>;
    buscaPetPorId(id: number): PetType | null | Promise<PetType | null>;
    buscaPetPorPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[]
    buscaPetGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
    atualizaPet(id: number, pet: PetType): void | Promise<void>;
    deletaPet(id: number): void | Promise<void>;
}