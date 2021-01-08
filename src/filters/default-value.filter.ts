export const defaultValue = (value: string, text: string = 'Não informado') => {
  return !value || value.length <= 0 ? text : value;
};
