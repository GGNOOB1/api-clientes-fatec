import { ValidationError } from 'class-validator';

export default function formatError(errors: ValidationError[]) {
  errors.forEach((error) => {});
  const listaErros = errors.map((el: ValidationError) => ({
    erro: el.constraints,
    valor: el.value,
    propriedade: el.property,
    teste: el.children,
  }));
  return listaErros;

  // if (errors[0].children.length > 0) {
  //   const listaErros = errors.map((el: ValidationError) => ({
  //     errosEndereco: {
  //       propriedade: el.children[0].property,
  //       erros: el.children[0].constraints,
  //     },
  //   }));
  //   return listaErros;
  // } else {
  //   const listaErros = errors.map((el: ValidationError) => ({
  //     erro: el.constraints,
  //     valor: el.value,
  //     propriedade: el.property,
  //   }));
  //   return listaErros;
  // }
}
