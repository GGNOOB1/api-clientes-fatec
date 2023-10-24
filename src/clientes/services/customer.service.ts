import { Repository } from 'typeorm';
import { CreateConnection } from '../../config/database/data-source';
import { Customer } from '../entity/customer';
import CriarClienteDto from '../dtos/createCustomer.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import formatError from '../errors/formatError';

import * as bcrypt from 'bcrypt';

import CreateCustomerDto from '../dtos/createCustomer.dto';
import ICustomer from '../interfaces/ICreateCustomerRequestBody';
import ICreateCustomerRequestBody from '../interfaces/ICreateCustomerRequestBody';
import UpdateCustomerDto from '../dtos/updateCustomer.dto';
import getRandomImage from '../utils/randomImage';
import { formatRg } from '../utils/formatRg';
import DeliveryAddress from '../entity/delivery_address';
import UpdateAddressDto from '../dtos/updateAddress.dto';

class CustomerService {
  private customerRepository: Repository<Customer>;
  private deliveryAddressRepository: Repository<DeliveryAddress>;

  constructor() {
    this.customerRepository = CreateConnection.getRepository(Customer);
    this.deliveryAddressRepository =
      CreateConnection.getRepository(DeliveryAddress);
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

    const newRg = parseInt(formatRg(createCustomer.identify_document));

    const rgExists = await this.customerRepository.findOneBy({
      identify_document: newRg,
    });

    if (emailExists) {
      throw new Error('O email já foi cadastrado!');
    }

    if (customer.password !== customer.confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    if (rgExists) {
      throw new Error('Esse rg ja foi cadastrado!');
    }
    customer.password = await bcrypt.hash(
      customer.password,
      parseInt(process.env.HASH),
    );

    customer.identify_document = formatRg(customer.identify_document);

    const newCustomer = await this.customerRepository.create({
      identify_document: parseInt(customer.identify_document),
      birthdate: customer.birthdate,
      email: customer.email,
      name: customer.name,
      password: customer.password,
      phone: customer.phone,
      status: 1,
      gender: customer.gender,
      image_path: getRandomImage(),
    });

    await this.customerRepository.save(newCustomer);

    const newDeliveryAddress = await this.deliveryAddressRepository.create({
      cep: createCustomer.cep,
      number: createCustomer.number,
      reference: createCustomer.reference,
      complement: createCustomer.complement,
      customer: newCustomer,
    });
    await this.deliveryAddressRepository.save(newDeliveryAddress);

    const currentCustomer = await this.customerRepository.findOneBy({
      email: newCustomer.email,
    });

    delete currentCustomer.password;
    delete currentCustomer.status;

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
      delete customer.status;
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

    const deliveryAddress = await this.deliveryAddressRepository.findOneBy({
      customer,
    });

    delete customer.password;
    delete customer.status;

    return {
      data: { customer, deliveryAddress },
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

    if (dadosAtualizados.identify_document) {
      const newRg = formatRg(dadosAtualizados.identify_document.toString());

      const rgExists = await this.customerRepository.findOneBy({
        identify_document: parseInt(newRg),
      });

      if (rgExists) {
        throw new Error('Esse rg ja foi cadastrado!');
      }

      dadosAtualizados.identify_document = parseInt(newRg);
    }

    await this.customerRepository.update({ id }, dadosAtualizados);

    return { success: true, data: 'Cliente atualizado com sucesso!' };
  }

  public async updateAddress(id, dadosAtualizados: UpdateAddressDto) {
    const updatedAddress = plainToClass(UpdateAddressDto, dadosAtualizados);
    const errors = await validate(updatedAddress);

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
    const address = await this.deliveryAddressRepository.findOneBy({ id });
    if (!address) {
      throw new Error('Não existe esse endereço no banco de dados');
    }

    await this.deliveryAddressRepository.update({ id }, dadosAtualizados);

    return { success: true, data: 'Dados atualizados com sucesso!' };
  }
}

export default CustomerService;
