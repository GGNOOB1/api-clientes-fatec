import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';
import CustomRequest from '../interfaces/ICustomRequest';
import { plainToClass } from 'class-transformer';
import CreateCustomerDto from '../dtos/createCustomer.dto';
import { validate } from 'class-validator';
import formatError from '../errors/formatError';
import getRandomImage from '../utils/randomImage';

class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  async createClient(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.customerService.signUpCustomer(req.body);

      if (result.success) {
        return res.status(201).json(result.currentCustomer);
      } else {
        return res.status(400).json(result.listaErros);
      }
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listAllCustomers(req: Request, res: Response): Promise<Response> {
    try {
      const clientes = await this.customerService.listAll();
      return res.json(clientes);
    } catch (error) {
      return res.status(404).json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }

  async listClient(req: Request, res: Response): Promise<Response> {
    try {
      const cliente = await this.customerService.listCustomer(req.params.id);
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async updateCliente(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.customerService.updateCustomer(
        req.params.id,
        req.body,
      );

      if (result.success) {
        return res.status(200).json(result.data);
      } else {
        return res.status(400).json(result.listaErros);
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
      // return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async deleteCliente(req: Request, res: Response): Promise<Response> {
    try {
      const message = await this.customerService.deleteCustomer(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async testFunction(req: Request, res: Response) {
    const link = getRandomImage();
    res.status(200).json(link);
  }
}

export default CustomerController;
