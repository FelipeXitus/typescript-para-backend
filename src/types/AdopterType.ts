import EnumEspecie from "../enum/EnumEspecie";
import AddressEntity from "../entities/AddressEntity";

type AdopterType = {
    id: number;
    nome: string;
    cpf: string;
    senha: string;
    celular: string;
    email: string;
    foto?: string;
    endereco?: AddressEntity;
    especieDePreferencia?: EnumEspecie;
    pets?: [{id: number; nome: string; especie: EnumEspecie; dataDeNascimento: Date}];
}

export default AdopterType;