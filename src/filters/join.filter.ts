export const join = (value: string | string[], another: string, separator: string = '/') => {
  if (value && value instanceof Array) {
    return value.join(',');
  }

  return value && another && '********' !== value ? `${value}${separator}${another}` : value;
};
