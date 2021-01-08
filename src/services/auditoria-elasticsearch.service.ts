import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuditoriaElasticsearch,
  FiltroAuditoriaElasticsearch,
  ElasticsearchConfig,
  Page,
  Pageable,
} from '@/models';
import { AbstractService, query, listAll, update } from '@/services';

export class AuditoriaElasticsearchService {

  // tslint:disable-next-line:max-line-length
  public static countTypes(params: FiltroAuditoriaElasticsearch, pageable: Pageable): Observable<Page<AuditoriaElasticsearch>> {
    return query(`${this.endpoint}/count-types`, params, pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  // tslint:disable-next-line:max-line-length
  public static listConfigIndices(params: FiltroAuditoriaElasticsearch, pageable: Pageable): Observable<Page<ElasticsearchConfig>> {
    return query(`${this.endpoint}/config`, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listAllIndice(): Observable<string[]> {
    return listAll(`${this.endpoint}/indices`);
  }

  // tslint:disable-next-line:max-line-length
  public static setConfigIndice(params: ElasticsearchConfig) {
    return update(`${this.endpoint}/config`, params);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/auditoria/elastic`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<AuditoriaElasticsearch> {
  const page = new Page<AuditoriaElasticsearch>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push({
      id: model.id,
      nomeIndice: model.indice,
      tipoDocumento: model.type,
      quantidadeDocumentos: model.docCount,
      ultimaInclusao: model.dataInclusao,
    });
  });

  return page;
}
