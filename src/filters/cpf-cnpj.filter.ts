import { CpfCnpjHelper } from '@/helpers';

export const cpf = (value: string) => {
  return CpfCnpjHelper.formatCpf(value);
};

export const cnpj = (value: string) => {
  return CpfCnpjHelper.formatCnpj(value);
};

export const cpfCnpj = (value: string) => {
  return CpfCnpjHelper.formatCpfCnpj(value);
};

export const truncateCpfCnpj = (values: string[]) => {
  return CpfCnpjHelper.truncateCpfCnpj(values);
};
