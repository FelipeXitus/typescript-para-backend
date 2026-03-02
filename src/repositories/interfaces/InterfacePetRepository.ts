import PetType from "../../types/PetType";

export default interface InterfacePetRepository {
    criaPet(pet: PetType): void;
    listaPets(): Array<PetType>;
    buscaPetPorId(id: number): PetType | null;
    atualizaPet(id: number, pet: PetType): void;
    deletaPet(id: number): void;
}