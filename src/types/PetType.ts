import EnumEspecie from "../enum/EnumEspecie";

type PetType = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    dataDeNascimento: Date;
    adotado: boolean;
}

export default PetType;