export const truncate = (values: string[]) => {
  const newValues = values != null ? values : [];
  return newValues.length > 1 ? newValues[0] + '...' : newValues[0];
};
