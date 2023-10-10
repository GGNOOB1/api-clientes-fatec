import { Customer } from '../../clientes/entity/customer';
import { CreateConnection } from '../../config/database/data-source';
import { Repository } from 'typeorm';
import LoginDto from '../dtos/login.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import formatError from '../../clientes/errors/formatError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import RecuperarSenha from '../dtos/recuperarSenha.dto';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

import emailTemplate from '../utils/emailTemplate';
import criptografarInfo from '../utils/criptografarInfo';
import descriptografarInfo from '../utils/descriptografarInfo';
import { DateTime } from 'luxon';
import verificarData from '../utils/verificarData';
import NovaSenhaDto from '../dtos/novaSenha.dto';

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
          id: cliente.id,
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
      sub: customer.id,
      email: customer.email,
    };

    const token = await jwt.sign(payload, process.env.SIGNATURE, {
      expiresIn: '1h',
    });
    return token;
  }

  static async verifyToken(
    token: string,
  ): Promise<{ key: string; id: number } | null> {
    try {
      const payload = jwt.verify(token, process.env.SIGNATURE);
      return payload as { key: string; id: number };
    } catch (error) {
      return null;
    }
  }

  public async forgotPassword(data: RecuperarSenha) {
    const dataCustomer = plainToClass(RecuperarSenha, data);
    const errors = await validate(dataCustomer);
    if (errors.length > 0) {
      const listaErros = formatError(errors);
      return {
        success: false,
        listaErros,
      };
    }
    const cliente = await this.customerRepository.findOneBy({
      email: dataCustomer.email,
    });
    if (!cliente) {
      throw new Error('O email não existe');
    }

    const dataAtual = new Date();
    dataAtual.setMinutes(dataAtual.getMinutes() + 10);

    const mensagemToken = {
      userId: cliente.id,
      expiresDate: dataAtual,
    };

    const token = criptografarInfo(
      mensagemToken.userId,
      mensagemToken.expiresDate,
    );

    const { email } = data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTHUSEREMAIL,
        pass: process.env.AUTHPASSEMAIL,
      },
    });

    // Defina o email de origem e destino
    const remetente = process.env.AUTHUSEREMAIL;
    const destinatario = email;

    const mailOptions = {
      from: remetente,
      to: destinatario,
      subject: 'Recuperação de senha',
      // subject: 'Assunto do Email',
      text: '',
      html: emailTemplate(cliente.name, token),
    };

    await transporter.sendMail(mailOptions);
    return 'Link de redefinição de senha enviado com sucesso!';
  }

  public async verificarResetSenha(token: { userId: number; data: Date }) {
    const tokenDescriptografado = descriptografarInfo(token);
    const resultado = verificarData(tokenDescriptografado.data);
    // const dataHoraUtc = DateTime.fromISO(tokenDescriptografado.data, {
    //   zone: 'utc',
    // });
    // const zonaHorarioBrasilia = 'America/Sao_Paulo';

    // const dataHoraBrasilia = dataHoraUtc.setZone(zonaHorarioBrasilia);
    // const dataHoraAtualBrasilia = DateTime.now().setZone(zonaHorarioBrasilia);

    // const expirada = dataHoraBrasilia < dataHoraAtualBrasilia;

    // // Se expirada for true quer dizer que a data expirou
    // if (expirada) {
    //   throw new Error('Token de recuperação de senha expirado');
    // }

    return {
      message: resultado,
      userId: tokenDescriptografado.userId,
    };
  }

  public async novaSenha(dados: NovaSenhaDto) {
    const novaSenhaDto = await plainToClass(NovaSenhaDto, dados);
    const errors = await validate(novaSenhaDto);

    if (errors.length > 0) {
      const listaErros = formatError(errors);
      return {
        success: false,
        errors: listaErros,
      };
    } else {
      const currentId = await this.customerRepository.findOneBy({
        id: novaSenhaDto.id,
      });

      if (currentId.email !== novaSenhaDto.email) {
        throw new Error('O seu email está incorreto!');
      }

      if (novaSenhaDto.newPassword !== novaSenhaDto.confirmNewPassword) {
        throw new Error('As senhas não coincidem');
      }

      currentId.password = await bcrypt.hash(
        novaSenhaDto.newPassword,
        parseInt(process.env.HASH),
      );

      await this.customerRepository.save(currentId);

      return {
        success: true,
      };
    }
  }
}
