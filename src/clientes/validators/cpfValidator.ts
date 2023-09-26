import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpfCnpj', async: false })
export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments) {
    const isCpf = cpf.isValid(value);
    const isCnpj = cnpj.isValid(value);

    if (!isCpf && !isCnpj) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'O valor inserido não é um cpf ou cnpj válido';
  }
}
