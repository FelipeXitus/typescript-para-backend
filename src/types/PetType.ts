import EnumEspecie from "../enum/EnumEspecie";

type PetType = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    dataDeNascimento: Date;
    adotado: boolean;
    adotante?: {
        id: number;
        nome: string;
        cpf: string;
        celular: string;
        email: string;}
}

export default PetType;