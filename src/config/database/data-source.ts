import 'reflect-metadata';
import City from '../../clientes/entity/city';
import { Customer } from '../../clientes/entity/customer';
import State from '../../clientes/entity/state';
import { DataSource } from 'typeorm';
import Category from '../../clientes/entity/category';

export const CreateConnection = new DataSource({
  // Dados para bd de teste local
  type: 'sqlite',
  database: 'src/config/database/db/clientes.sqlite',
  synchronize: false,
  logging: false,
  entities: [Customer, City, State, Category], //
  subscribers: [],

  // Dados para bd oficial

  // type: 'mysql',
  // host: process.env.HOST,
  // port: parseInt(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // synchronize: false,
  // logging: false,
  // entities: [Customer, City, State, Category],
  // subscribers: [],
  // migrations: [],
});
