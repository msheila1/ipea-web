import { IncidenciaPenal, ProcessoPena } from '@/models';

export const formatIncidenciaPenal = (value: IncidenciaPenal): string => {
  if (!value) {
    return value;
  }

  const terms: any = {
    'ART. ': value.artigo,
    ' / PAR. ': value.paragrafo,
    ' / INC. ': value.inciso,
    ' / ': value.legislacao,
  };
  let formatted: string = '';

  Object.keys(terms).forEach((key: string) => {
    if (terms[key]) {
      formatted += key + terms[key];
    }
  });

  return formatted;
};

export const formatSituacaoCriminal = (codigo: number): string => {
  switch (codigo) {
    case 1:
      return 'Civil';
    case 2:
      return 'Criminal';
    case 3:
      return 'Procurado';
    case 4:
      return 'Criminal ok';
    case 5:
      return 'Falecido';
    case 6:
      return 'Autor Lei 9.099';
    case 7:
      return 'Medida Cautelar';
    default:
      return '';
  }
};

export const formatPena = (pena: ProcessoPena): string => {
  let resultText = '';
  const format = (value: number , singular: string , plural: string ) => {
    if (value) {
      return (
        (resultText ? ', ' : '') +
        value +
        ' ' +
        (value > 1 ? plural : singular)
      );
    }

    return '';
  };

  resultText += format(pena.ano, 'Ano', 'Anos');
  resultText += format(pena.mes, 'Mês', 'Meses');
  resultText += format(pena.dia, 'Dia', 'Dias');
  resultText += pena.tipo ? (resultText ? ' / ' : '') + pena.tipo : '';
  return resultText;
};
