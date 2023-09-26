import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customRGFormat', async: false })
export class RgValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const rgPattern = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/; // Padrão para RG no formato "28.478.269-5"

    if (!rgPattern.test(value)) {
      return false; // O número de RG não corresponde ao padrão
    }

    // Verificação do dígito verificador
    const rgDigits = value.replace(/[^\d]/g, ''); // Remove pontos e traço
    const calculatedDigit = calculateRGChecksumDigit(rgDigits);
    const providedDigit = parseInt(value.charAt(value.length - 1), 10);

    if (calculatedDigit !== providedDigit) {
      return false; // O dígito verificador não está correto
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Número de RG inválido'; // Mensagem de erro padrão
  }
}

// Função para calcular o dígito verificador
function calculateRGChecksumDigit(digits: string): number {
  const weights = [2, 3, 4, 5, 6, 7, 8, 9];
  let sum = 0;

  for (let i = 0; i < digits.length - 1; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights[i];
  }

  const remainder = sum % 11;
  const calculatedDigit = remainder < 2 ? 0 : 11 - remainder;

  return calculatedDigit;
}
