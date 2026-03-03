import {Request, Response} from "express";
import type PetType from "../types/PetType";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import AdopterRepository from "../repositories/AdopterRepository";


export default class PetController {
    constructor(private repository: PetRepository, private adopterRepository: AdopterRepository) {}
    async criaPet(req: Request, res: Response) {
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({"error": "Espécie inválida"});
        }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }
    async listaPets(req: Request, res: Response) {
        const listaDePets = await this.repository.listaPets();
        return res.status(200).json(listaDePets);
    }
    async buscaPetPeloId(req: Request, res: Response) {
        const { id } = req.params;
        const pet = await this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        return res.status(200).json(pet);
    }
    async buscaPetGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query as { campo: string, valor: string };
        if (!campo || !valor) {
            return res.status(400).json({"error": "Campo e valor são obrigatórios"});
        }
        const ListaPetsFiltrada = (await this.repository.listaPets()).filter((pet: PetType) => {
            if (campo === "dataDeNascimento") {
                return pet.dataDeNascimento.toISOString() === valor;
            }
            return String(pet[campo as keyof PetType]) === valor;
        });
        if (ListaPetsFiltrada.length === 0) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        return res.status(200).json(ListaPetsFiltrada);
    }
    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        const pet = await this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        await this.repository.atualizaPet(Number(id), { id: Number(id), nome, especie, dataDeNascimento, adotado });
        pet.nome = nome || pet.nome;
        pet.especie = especie || pet.especie;
        pet.dataDeNascimento = dataDeNascimento || pet.dataDeNascimento;
        pet.adotado = adotado || pet.adotado;
        return res.status(200).json(pet);
    }
    async deletaPet(req: Request, res: Response) {
        const { id } = req.params;
        const pet = await this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        await this.repository.deletaPet(Number(id));
        return res.status(200).json({"message": "Pet deletado com sucesso!"});
    }
    async adotaPet(req: Request, res: Response) {
        const { petId, adopterId } = req.params;
        const pet = await this.repository.buscaPetPorId(Number(petId));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        const adotante = await this.adopterRepository.buscaAdotantePorId(Number(adopterId));
        if (!adotante) {
            return res.status(404).json({"error": "Adotante não encontrado"});
        }
        pet.adotado = true;
        pet.adotante = adotante;
        await this.repository.atualizaPet(Number(petId), pet);
        return res.status(200).json(pet);
    }
}