import 'reflect-metadata';
import { Customer } from '../../clientes/entity/customer';
import { DataSource } from 'typeorm';
import DeliveryAddress from '../../clientes/entity/delivery_address';
export const CreateConnection = new DataSource({
  // Dados para bd de teste local
  // type: 'sqlite',
  // database: 'src/config/database/db/clientes.sqlite',
  // synchronize: true,
  // logging: false,
  // // entities: [Customer, City, State, Category],
  // entities: [Customer, DeliveryAddress],
  // subscribers: [],

  // Dados para bd oficial

  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Customer, DeliveryAddress],
  subscribers: [],
  migrations: [],
});
