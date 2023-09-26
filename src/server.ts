import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import clientesRouter from './clientes/routes/clientes.router';
import { CreateConnection } from './config/database/data-source';
import * as cors from 'cors';
import authRouter from './auth/routes/auth.router';
import * as cookieParser from 'cookie-parser';

const corsOptions = {
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization', // Permitir cabeçalhos específicos
  exposedHeaders: 'Authorization', // Expor cabeçalhos para a resposta
  credentials: true, // Habilitar credenciais (cookies, autenticação)
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

CreateConnection.initialize();
app.use('/api/v1/clientes', clientesRouter);
app.use('/api/v1/auth', authRouter);

const port = 3001;

app.listen(port, () => {
  console.log('Servidor iniciado com sucesso!');
});
