// tslint:disable-next-line:max-line-length
export const formatBoolean = (value: boolean | string | number, trueText: string = 'Sim', falseText: string = 'Não') => {
  return value === true || value === 1 || value === 'S' ? trueText : falseText;
};
