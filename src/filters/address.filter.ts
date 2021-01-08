import _ from 'lodash';

import { CepHelper } from '@/helpers';

export const address = (endereco: any) => {
  if (!endereco) {
    return null;
  }

  if (endereco.confidencial) {
    return '********';
  }

  let formatted = append(endereco.logradouro, 'capitalize');
  formatted += append(endereco.numero, '', ', ', ', s/n');
  formatted += append(endereco.complemento, 'lowerCase', ' - ');
  formatted += append(endereco.bairro, 'startCase', ', ');
  formatted += append(endereco.municipio, 'startCase', ', ');
  formatted += append(endereco.uf, 'upperCase', ', ');
  formatted += append(endereco.cep, 'cep', ', CEP ');

  return formatted === ', s/n' ? null : formatted;
};

function append(value: string, formatType: string = '', prefix: string = '', defaultValue: string = ''): string {
  const trimmed = value && String(value).trim();
  return trimmed ? prefix + format(trimmed, formatType) : defaultValue;
}

function format(value: string, type: string): string {
  let newValue = value;

  if ('capitalize' === type) {
    newValue = _.capitalize(value.toLowerCase());

  } else if ('lowerCase' === type) {
    newValue = _.lowerCase(value);

  } else if ('startCase' === type) {
    newValue = _.startCase(value.toLowerCase());

  } else if ('upperCase' === type) {
    newValue = _.upperCase(value);

  } else if ('cep' === type) {
    newValue = CepHelper.format(value);
  }

  return newValue;
}
