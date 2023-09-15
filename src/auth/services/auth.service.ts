import { Customer } from '../../clientes/entity/customer';
import { CreateConnection } from '../../config/database/data-source';
import { Repository } from 'typeorm';
import LoginDto from '../dtos/login.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import formatError from '../../clientes/errors/formatError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';

export default class AuthService {
  private customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = CreateConnection.getRepository(Customer);
  }

  public async verificarLogin(body: LoginDto) {
    const loginDto = await plainToClass(LoginDto, body);
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      const listaErros = formatError(errors);
      return {
        success: false,
        errors: listaErros,
      };
    } else {
      const cliente = await this.customerRepository.findOneBy({
        email: loginDto.email,
      });

      if (!cliente) {
        throw new Error('O email não existe');
      }

      const resultado = await this.verificarSenha(
        loginDto.password,
        cliente.password,
      );

      if (!resultado) {
        throw new Error('A senha está errada!');
      }

      const token = await AuthService.generateToken(cliente);

      return {
        success: true,
        message: {
          message: 'login realizado com sucesso!',
          token,
        },
      };
    }
  }

  public async verificarSenha(senhaCliente, senhaBd) {
    const senhaVerificada = await bcrypt.compare(senhaCliente, senhaBd);

    if (senhaVerificada) {
      return true;
    } else {
      return false;
    }
  }

  static async generateToken(customer: Customer): Promise<string> {
    const payload = {
      id: customer.id,
      key: customer.email,
    };

    const token = await jwt.sign(payload, process.env.PAYLOAD, {
      expiresIn: '1m',
    });
    return token;
  }

  static async verifyToken(
    token: string,
  ): Promise<{ key: string; id: number } | null> {
    try {
      const payload = jwt.verify(token, process.env.PAYLOAD);
      return payload as { key: string; id: number };
    } catch (error) {
      return null;
    }
  }
}
