import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";

type PetType = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    porte: EnumPorte;
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