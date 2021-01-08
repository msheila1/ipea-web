import { CepHelper } from '@/helpers';

export const cep = (value: string) => {
  return CepHelper.format(value);
};
