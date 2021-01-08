const regex: RegExp = /^\(*([\d]{2})\)*\s*([\d]{4,5})-*([\d]{4})/;

export const phone = (value: string) => {
  return value && regex.test(value) ? value.replace(regex, '($1) $2-$3') : value;
};
