import PetType from "../types/PetType";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import { Repository } from "typeorm";
import AdopterEntity from "../entities/AdopterEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;
    private adopterRepository: Repository<AdopterEntity>;

    constructor(repository: Repository<PetEntity>, adopterRepository: Repository<AdopterEntity>) {
        this.repository = repository;
        this.adopterRepository = adopterRepository;
    }

    async geraId(): Promise<number> {
        const row = await this.repository.query("SELECT MAX(id) as ultimoId FROM pet_entity");
        return (row?.[0]?.ultimoId ?? 0) + 1;
    }

    async criaPet(pet: PetType): Promise<void> {
        await this.repository.save(pet);
    }
    async listaPets(): Promise<Array<PetType>> {
        return await this.repository.find({relations: ["adotante"]});
    }
    async buscaPetPorId(id: number): Promise<PetType | null> {
        return await this.repository.findOne({ where: { id }, relations: ["adotante"] });
    }
    async buscaPetPorPorte(porte: EnumPorte): Promise<PetEntity[]> {
        return await this.repository.findBy({ porte });
    }
    async buscaPetGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]):  Promise<PetEntity[]>  {
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
    async adotaPet(petId: number, adopterId: number): Promise<void> {
        const pet = await this.repository.findOne({ where: { id: petId } });
        if (!pet) {
            throw new Error("Pet não encontrado");
        }
        const adotante = await this.adopterRepository.findOne({ where: { id: adopterId } });
        if (!adotante) {
            throw new Error("Adotante não encontrado");
        }
        pet.adotado = true;
        pet.adotante = adotante;
        await this.repository.save(pet);
    }
}