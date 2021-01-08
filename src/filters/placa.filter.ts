const regex: RegExp = /^([a-zA-Z]{3})\-*([\d]{3,4})/;

export const placa = (value: string) => {
  return value && regex.test(value) ? value.replace(regex, '$1-$2') : value;
};
