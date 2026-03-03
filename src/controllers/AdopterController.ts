import {Request, Response} from "express";
import AdopterRepository from "../repositories/AdopterRepository";
import AdopterEntity from "../entities/AdopterEntity";
import { AppDataSource } from "../config/dataSource";
import AddressEntity from "../entities/AddressEntity";

export default class AdopterController {
    private repository = new AdopterRepository(AppDataSource.getRepository(AdopterEntity));

    async criaAdotante(req: Request, res: Response) {
        try {
            const { nome, celular, endereco, foto, senha, especieDePreferencia, cpf, email, pets } = req.body;

            const novoAdotante = new AdopterEntity(nome, cpf, senha, celular, email, endereco ?? null, foto ?? null, especieDePreferencia ?? null);
            novoAdotante.pets = pets ?? [];

            await this.repository.criaAdotante(novoAdotante);
            return res.status(201).json(novoAdotante);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao criar o adotante' });
        }
      }
    async listaAdotantes(req: Request, res: Response) {
        try {
            const listaAdotantes = await this.repository.listaAdotantes();
            return res.status(200).json(listaAdotantes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar os adotantes' });
        }
      }
    async buscaAdotantePorId(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const adotante = await this.repository.buscaAdotantePorId(Number(id));
        if (!adotante) {
            return res.status(404).json({ error: 'Adotante não encontrado' });
        }
            return res.status(200).json(adotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o adotante' });
        }
    }
    async buscaAdotantePorCpf(req: Request, res: Response) {
        try {
        const { cpf } = req.params;
        const adotante = await this.repository.buscaAdotantePorCpf(String(cpf));
        if (!adotante) {
            return res.status(404).json({ error: 'Adotante não encontrado' });
        }
            return res.status(200).json(adotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o adotante' });
        }
    }
    async buscaAdotanteGenerico(req: Request, res: Response) {
        try {
        const { campo } = req.query;
        const adotante = await this.repository.buscaAdotantePorParametro(String(campo));
        if (!adotante) {
            return res.status(404).json({ error: 'Adotante não encontrado' });
        }
            return res.status(200).json(adotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o adotante' });
        }
    }
    async deletaAdotante(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const adotante = await this.repository.buscaAdotantePorId(Number(id));
        if (!adotante) {
            return res.status(404).json({ error: 'Adotante não encontrado' });
        }
        await this.repository.deletaAdotante(Number(id));
        return res.status(200).json({ message: 'Adotante deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar o adotante' });
        }
    }
    async atualizaAdotante(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { nome, celular, foto, senha, especieDePreferencia, cpf, email} = req.body;
        const adotante = await this.repository.buscaAdotantePorId(Number(id));
        if (!adotante) {
            return res.status(404).json({ error: 'Adotante não encontrado' });
        }
        adotante.nome = nome;
        adotante.celular = celular;
        adotante.foto = foto;
        adotante.senha = senha;
        adotante.especieDePreferencia = especieDePreferencia;
        adotante.cpf = cpf;
        adotante.email = email;

        await this.repository.atualizaAdotante(adotante);
        return res.status(200).json(adotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o adotante' });
        }
    }
    async atualizaEnderecoAdotante(req: Request, res: Response) {
        try {
        const { id } = req.params;
        const { cep, logradouro, numero, cidade, estado, complemento } = req.body;
        const adotante = await this.repository.buscaAdotantePorId(Number(id));
        if (!adotante) {
            return res.status(404).json({ error: 'Adotante não encontrado' });
        }
        adotante.endereco = new AddressEntity(logradouro, numero, cidade, estado, cep, complemento);

        await this.repository.atualizaEnderecoAdotante(Number(id), adotante.endereco);
        return res.status(200).json(adotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o adotante' });
        }
    }
}