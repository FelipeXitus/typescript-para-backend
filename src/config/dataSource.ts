import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import AdopterEntity from "../entities/AdopterEntity";
import AddressEntity from "../entities/AddressEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [PetEntity, AdopterEntity, AddressEntity],
    migrations: [],
    subscribers: [],
});