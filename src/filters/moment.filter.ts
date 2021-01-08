import { EncryptHelper, MomentHelper } from '@/helpers';

export const formatDate = (value: string, pattern: string) => {
  return EncryptHelper.isNotMasked(value) ? MomentHelper.formatDate(value, pattern) : value;
};

export const formatTime = (value: string, pattern: string) => {
  return EncryptHelper.isNotMasked(value) ? MomentHelper.formatTime(value, pattern) : value;
};

export const formatDateTime = (value: string, pattern: string) => {
  return EncryptHelper.isNotMasked(value) ? MomentHelper.formatDateTime(value, pattern) : value;
};

export const formatYear = (value: string, sufix: string = 'anos', pattern: string) => {
  return EncryptHelper.isNotMasked(value) ? `(${MomentHelper.age(value, pattern)} ${sufix})` : value;
};
