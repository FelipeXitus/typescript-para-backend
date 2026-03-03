import {Request, Response} from "express";
import type PetType from "../types/PetType";
import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import AdopterRepository from "../repositories/AdopterRepository";


export default class PetController {
    constructor(private repository: PetRepository, private adopterRepository: AdopterRepository) {}
    async criaPet(req: Request, res: Response) {
        const { nome, especie, porte, dataDeNascimento, adotado } = <PetEntity>req.body;
        if(!(especie in EnumEspecie)) {
            return res.status(400).json({"error": "Espécie inválida"});
        }
        if(!(porte in EnumPorte)) {
            return res.status(400).json({"error": "Porte inválido"});
        }
        const novoPet = new PetEntity(nome, especie, porte, dataDeNascimento, adotado);
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
    async buscaPetPorPorte(req: Request, res: Response) {
        const porte = String(req.query.porte);
        if (!(porte in EnumPorte)) {
            return res.status(400).json({"error": "Porte inválido"});
        }
        const listaDePets = await this.repository.listaPets();
        const listaFiltrada = listaDePets.filter((pet: PetType) => pet.porte === porte);
        return res.status(200).json(listaFiltrada);
    }
    async buscaPetGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query;
        const campoStr = Array.isArray(campo) ? campo[0] : campo;
        const valorStr = Array.isArray(valor) ? valor[0] : valor;
        
        if (!campoStr || !valorStr) {
            return res.status(400).json({"error": "Campo e valor são obrigatórios"});
        }
        const ListaPetsFiltrada = (await this.repository.listaPets()).filter((pet: PetType) => {
            if (campoStr === "dataDeNascimento") {
                return pet.dataDeNascimento.toISOString() === valorStr;
            }
            return String(pet[campoStr as keyof PetType]) === valorStr;
        });
        if (ListaPetsFiltrada.length === 0) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        return res.status(200).json(ListaPetsFiltrada);
    }
    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, porte, dataDeNascimento, adotado } = <PetEntity>req.body;
        const pet = await this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        if(especie && !Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({"error": "Espécie inválida"});
        }
        if(porte && !(porte in EnumPorte)) {
            return res.status(400).json({"error": "Porte inválido"});
        }
        await this.repository.atualizaPet(Number(id), { id: Number(id), nome, especie, porte, dataDeNascimento, adotado });
        pet.nome = nome || pet.nome;
        pet.especie = especie || pet.especie;
        pet.porte = porte || pet.porte;
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