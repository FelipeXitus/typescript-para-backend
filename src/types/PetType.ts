import EnumEspecie from "../enum/EnumEspecie";

type PetType = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    idade: number;
    adotado: boolean;
}

export default PetType;