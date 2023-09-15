import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import formatError from '../errors/formatError';
import { plainToClass } from 'class-transformer';
import CreateCustomerDto from '../dtos/createCustomer.dto';
import CustomRequest from '../interfaces/ICustomRequest';

export default async function validateDataPostCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const createCustomer = plainToClass(CreateCustomerDto, req.body);
  const errors = await validate(createCustomer);

  if (errors.length > 0) {
    const listaErros = formatError(errors);
    return res.status(400).json(listaErros);
  }

  next();
}
