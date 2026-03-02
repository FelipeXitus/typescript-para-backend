import PetType from "../../types/PetType";

export default interface InterfacePetRepository {
    criaPet(pet: PetType): void | Promise<void>;
    listaPets(): Array<PetType> | Promise<Array<PetType>>;
    buscaPetPorId(id: number): PetType | null | Promise<PetType | null>;
    atualizaPet(id: number, pet: PetType): void | Promise<void>;
    deletaPet(id: number): void | Promise<void>;
}