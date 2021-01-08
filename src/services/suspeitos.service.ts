import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

import { Delegacia, FiltroSuspeito, Foto, Ocorrencia, Page, Pageable, Suspeito } from '@/models';
import { AbstractService, listBy, query } from '@/services';

export class SuspeitosService {

  public static query(filter: FiltroSuspeito, pageable: Pageable): Observable<Page<Suspeito>> {
    return query(`${this.endpoint}`, normalizeFilter(filter), pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  public static list(params: any): Observable<Suspeito[]> {
    return listBy(`${this.endpoint}`, { ...params, counted: false });
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/ocorrencias/pessoas-indiciadas`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeFilter(fromFilter: FiltroSuspeito): any {
  if (!fromFilter.ocorrencias || !fromFilter.ocorrencias.length) {
    return fromFilter;
  }

  return {
    idsOcorrencia: _.map(fromFilter.ocorrencias, 'id'),
    sort: 'nome.keyword',
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<Suspeito> {
  const page = new Page<Suspeito>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    if (model.rg || model.cpf) {
      page.data.push(normalizeSuspeito(model));
    }
  });
  page.count = page.data.length;

  return page;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeSuspeito(model: any): Suspeito {
  return {
    id: model.id,
    idPessoa: model.idPessoaCivil || model.idPessoaCriminal,
    rg: model.rg,
    cpf: model.cpf,
    nome: model.nome,
    ocorrencia: normalizeOcorrencia(model),
    fotos: [] as Foto[],
    reconhecido: false,
  } as Suspeito;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeOcorrencia(model: any): Ocorrencia {
  const mountId = (data: any) => {
    if (data.id_delegacia_bo && data.ano_bo && data.numero_bo) {
      return `${data.id_delegacia_bo}_${data.ano_bo}_${data.numero_bo}_ocorrencias_ocorrencia`;
    }

    return null;
  };

  return {
    id: mountId(model),
    numero: model.numero_bo,
    ano: model.ano_bo,
    delegacia: normalizeDelegacia(model),
  } as Ocorrencia;
}



// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeDelegacia(model: any): Delegacia | null {
  if (model.id_delegacia_bo || model.nome_delegacia) {
    return {
      id: model.id_delegacia_bo,
      codigo: model.id_delegacia_bo,
      nome: model.nome_delegacia,
    } as Delegacia;
  }

  return null;
}
