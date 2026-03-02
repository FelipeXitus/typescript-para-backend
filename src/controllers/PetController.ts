import {Request, Response} from "express";
import type PetType from "../types/PetType";
import EnumEspecie from "../enum/EnumEspecie";

let listaDePets: Array<PetType> = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const { id, nome, especie, idade, adotado } = <PetType>req.body;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({"error": "Espécie inválida"});
        }
        const novoPet: PetType = { id, nome, especie, idade, adotado };
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }
    listaPets(req: Request, res: Response) {
       return res.status(200).json(listaDePets);
    }
    buscaPetPeloId(req: Request, res: Response) {
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        return res.status(200).json(pet);
    }
    atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, idade, adotado } = <PetType>req.body;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        
        pet.nome = nome;
        pet.especie = especie;
        pet.idade = idade;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    }
    deletaPet(req: Request, res: Response) {
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({"message": "Pet deletado com sucesso!"});
    }
}