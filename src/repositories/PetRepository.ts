import PetType from "../types/PetType";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import { Repository } from "typeorm";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }
    criaPet(pet: PetType): void {
        this.repository.save(pet);
    }
    listaPets(): Array<PetType> {
        throw new Error("Method not implemented.");
    }
    buscaPetPorId(id: number): PetType | null {
        throw new Error("Method not implemented.");
    }
    atualizaPet(id: number, pet: PetType): void {
        throw new Error("Method not implemented.");
    }
    deletaPet(id: number): void {
        throw new Error("Method not implemented.");
    }



}