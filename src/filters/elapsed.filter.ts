import moment from 'moment';

import { Period } from '@/models';

export const elapsed = (from: Period | Date, to: Date | string, type: string = 'humanize') => {
  if (!from || (!(from instanceof Period) && !to)) {
    return null;
  }

  const start = from instanceof Period ? from.start : from;
  const end = from instanceof Period ? from.end : to;

  if (!start || !end) {
    return null;
  }

  const difference = moment(end).diff(moment(start));

  if (type === 'humanize') {
    return moment.duration(difference).locale('pt').humanize();
  }

  return moment.duration(difference).asMilliseconds();
};
