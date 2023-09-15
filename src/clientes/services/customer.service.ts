import { Repository } from 'typeorm';
import { CreateConnection } from '../../config/database/data-source';
import { Customer } from '../entity/customer';
import CriarClienteDto from '../dtos/createCustomer.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import formatError from '../errors/formatError';

import * as bcrypt from 'bcrypt';
import City from '../entity/city';
import State from '../entity/state';
import CreateCustomerDto from '../dtos/createCustomer.dto';
import ICustomer from '../interfaces/ICreateCustomerRequestBody';
import ICreateCustomerRequestBody from '../interfaces/ICreateCustomerRequestBody';
import UpdateCustomerDto from '../dtos/updateCustomer.dto';
import getRandomImage from '../utils/randomImage';

class CustomerService {
  private customerRepository: Repository<Customer>;
  private cityRepository: Repository<City>;
  private stateRepository: Repository<State>;

  constructor() {
    this.customerRepository = CreateConnection.getRepository(Customer);
    this.cityRepository = CreateConnection.getRepository(City);
    this.stateRepository = CreateConnection.getRepository(State);
  }

  public async signUpCustomer(customer: ICreateCustomerRequestBody) {
    const createCustomer = plainToClass(CreateCustomerDto, customer);
    const errors = await validate(createCustomer);

    if (errors.length > 0) {
      const listaErros = formatError(errors);
      return {
        success: false,
        listaErros,
      };
    }

    const emailExists = await this.customerRepository.findOneBy({
      email: customer.email,
    });
    if (emailExists) {
      throw new Error('O email já foi cadastrado!');
    }

    if (customer.password !== customer.confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    customer.password = await bcrypt.hash(
      customer.password,
      parseInt(process.env.HASH),
    );

    const newState = await this.stateRepository.create({
      name: customer.city.state.name,
    });
    await this.stateRepository.save(newState);

    const newCity = await this.cityRepository.create({
      name: customer.city.name,
      state: newState,
    });
    await this.cityRepository.save(newCity);

    const newCustomer = await this.customerRepository.create({
      address: customer.address,
      birthdate: customer.birthdate,
      email: customer.email,
      name: customer.name,
      password: customer.password,
      phone: customer.phone,
      status: customer.status,
      gender: customer.gender,
      imgpath: getRandomImage(),
      city: newCity,
    });

    await this.customerRepository.save(newCustomer);

    const currentCustomer = await this.customerRepository.findOneBy({
      email: newCustomer.email,
    });
    return {
      success: true,
      currentCustomer,
    };
  }

  public async listAll() {
    const customers = await this.customerRepository.find();

    if (customers.length === 0) {
      throw new Error('Não a clientes no banco de dados');
    }

    for (let customer of customers) {
      delete customer.password;
    }
    return {
      data: customers,
    };
  }

  public async listCustomer(id) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new Error('Não existe esse id no banco de dados');
    }

    delete customer.password;

    return {
      data: customer,
    };
  }

  public async deleteCustomer(id) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new Error('Não existe esse id no banco de dados');
    }

    await this.customerRepository.remove(customer);

    return {
      message: 'Cliente deletado com sucesso!',
    };
  }

  public async updateCustomer(id, dadosAtualizados: UpdateCustomerDto) {
    const updatedCustomer = plainToClass(UpdateCustomerDto, dadosAtualizados);
    const errors = await validate(updatedCustomer);

    if (errors.length > 0) {
      const listaErros = formatError(errors);
      return {
        success: false,
        listaErros,
      };
    }

    if (Object.keys(dadosAtualizados).length === 0) {
      throw new Error('Nenhum campo foi inserido');
    }
    const cliente = await this.customerRepository.findOneBy({ id });
    if (!cliente) {
      throw new Error('Não existe esse id no banco de dados');
    }

    if (dadosAtualizados.email) {
      const emailExists = await this.customerRepository.findOneBy({
        email: dadosAtualizados.email,
      });
      if (emailExists) {
        throw new Error('O email já foi cadastrado!');
      }
    }

    await this.customerRepository.update({ id }, dadosAtualizados);
    const clienteAtualizado = await this.customerRepository.findOneBy({ id });
    return { success: true, data: clienteAtualizado };
  }
}

export default CustomerService;
