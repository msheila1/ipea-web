import { EncryptHelper } from '@/helpers';

export const encrypt = (value: string, encrypted: boolean = true) => {
  return encrypted ? EncryptHelper.MASK : value;
};
