import {Request, Response} from "express";
import type PetType from "../types/PetType";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    constructor(private repository: PetRepository) {}
    criaPet(req: Request, res: Response) {
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({"error": "Espécie inválida"});
        }
        const novoPet = new PetEntity();
        novoPet.id = geraId();
        novoPet.nome = nome;
        novoPet.especie = especie;
        novoPet.dataDeNascimento = dataDeNascimento;
        novoPet.adotado = adotado;
        this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }
    listaPets(req: Request, res: Response) {
       return res.status(200).json(this.repository.listaPets());
    }
    buscaPetPeloId(req: Request, res: Response) {
        const { id } = req.params;
        const pet = this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        return res.status(200).json(pet);
    }
    buscaPetGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query as { campo: string, valor: string };
        if (!campo || !valor) {
            return res.status(400).json({"error": "Campo e valor são obrigatórios"});
        }
        
        const ListaPetsFiltrada = this.repository.listaPets().filter((pet) => {
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
    atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, dataDeNascimento, adotado } = <PetEntity>req.body;
        const pet = this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        this.repository.atualizaPet(Number(id), { id: Number(id), nome, especie, dataDeNascimento, adotado });
        pet.nome = nome;
        pet.especie = especie;
        pet.dataDeNascimento = dataDeNascimento;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    }
    deletaPet(req: Request, res: Response) {
        const { id } = req.params;
        const pet = this.repository.buscaPetPorId(Number(id));
        if (!pet) {
            return res.status(404).json({"error": "Pet não encontrado"});
        }
        this.repository.deletaPet(Number(id));
        return res.status(200).json({"message": "Pet deletado com sucesso!"});
    }
}