import PetType from "../types/PetType";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import { Repository } from "typeorm";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    async geraId(): Promise<number> {
        const row = await this.repository.query("SELECT MAX(id) as ultimoId FROM pet_entity");
        return (row?.[0]?.ultimoId ?? 0) + 1;
    }

    async criaPet(pet: PetType): Promise<void> {
        await this.repository.save(pet);
    }
    async listaPets(): Promise<Array<PetType>> {
        return await this.repository.find();
    }
    async buscaPetPorId(id: number): Promise<PetType | null> {
        return await this.repository.findOneBy({ id });
    }
    async buscaPetGenerico(campo: string, valor: string): Promise<Array<PetType>> {
        return await this.repository.findBy({ [campo]: valor });
    }
    async atualizaPet(id: number, pet: PetType): Promise<void> {
        const petToUpdate = await this.repository.findOne({ where: { id } });
        if (!petToUpdate) {
            throw new Error("Pet não encontrado");
        }
        Object.assign(petToUpdate, pet);
        await this.repository.save(petToUpdate);
    }
    async deletaPet(id: number): Promise<void> {
        await this.repository.delete(id);
    }



}