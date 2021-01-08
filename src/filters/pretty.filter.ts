export const pretty = (value: string, format: string = 'json'): string => {
  if (!value) {
    return value;
  }

  return format === 'json' ? JSON.stringify(JSON.parse(value), null, 2) : value;
};
