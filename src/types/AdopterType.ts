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
    especieDePreferencia?: EnumEspecie
}

export default AdopterType;