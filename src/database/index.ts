import { DataSource } from "typeorm";
import { EventoEntity } from './entities/EventoEntity';

export const dataSource= new DataSource({
    database: 'database.db',
    entities: [ EventoEntity],
    type: 'expo',
    driver: require('expo-sqlite'),
    synchronize: true,
});