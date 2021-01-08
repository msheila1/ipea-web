import Vue from 'vue';

import { address } from '@/filters/address.filter';
import { cep } from '@/filters/cep.filter';
import { cpf, cnpj, cpfCnpj, truncateCpfCnpj } from '@/filters/cpf-cnpj.filter';
import { formatIncidenciaPenal, formatPena, formatSituacaoCriminal } from '@/filters/criminal.filter';
import { defaultValue } from '@/filters/default-value.filter';
import { elapsed } from '@/filters/elapsed.filter';
import { encrypt } from '@/filters/encrypt.filter';
import { firstLetter } from '@/filters/first-letter.filter';
import { formatBoolean } from '@/filters/boolean.filter';
import { formatDate, formatTime, formatDateTime, formatYear } from '@/filters/moment.filter';
import { join } from '@/filters/join.filter';
import { lookup } from '@/filters/lookup.filter';
import { normalize } from '@/filters/normalize.filter';
import { numeric } from '@/filters/numeric.filter';
import { phone } from '@/filters/phone.filter';
import { placa } from '@/filters/placa.filter';
import { pretty } from '@/filters/pretty.filter';
import { startCase } from '@/filters/startCase.filter';
import { truncate } from '@/filters/truncate.filter';

const install: any = (vue: Vue, opts = {}) => {
  if (install.installed) {
    return;
  }

  Vue.filter('address', address);
  Vue.filter('formatBoolean', formatBoolean);
  Vue.filter('cep', cep);
  Vue.filter('cpf', cpf);
  Vue.filter('cnpj', cnpj);
  Vue.filter('cpfCnpj', cpfCnpj);
  Vue.filter('defaultValue', defaultValue);
  Vue.filter('elapsed', elapsed);
  Vue.filter('encrypt', encrypt);
  Vue.filter('firstLetter', firstLetter);
  Vue.filter('formatDate', formatDate);
  Vue.filter('formatTime', formatTime);
  Vue.filter('formatDateTime', formatDateTime);
  Vue.filter('formatIncidenciaPenal', formatIncidenciaPenal);
  Vue.filter('formatPena', formatPena);
  Vue.filter('formatSituacaoCriminal', formatSituacaoCriminal);
  Vue.filter('formatYear', formatYear);
  Vue.filter('join', join);
  Vue.filter('lookup', lookup);
  Vue.filter('normalize', normalize);
  Vue.filter('numeric', numeric);
  Vue.filter('phone', phone);
  Vue.filter('placa', placa);
  Vue.filter('pretty', pretty);
  Vue.filter('startCase', startCase);
  Vue.filter('truncate', truncate);
  Vue.filter('truncateCpfCnpj', truncateCpfCnpj);
};

export default {
  install,
};
