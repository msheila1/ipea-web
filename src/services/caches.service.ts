import { Observable } from 'rxjs';

import {
  Cache,
  FiltroCache,
  Page,
  Pageable,
} from '@/models';
import { AbstractService, query, destroyAll } from '@/services';
import { map } from 'rxjs/operators';
import { destroy, destroyBy } from '@/services/abstract.service';

export class CachesService {

  public static query(params: FiltroCache, pageable: Pageable): Observable<Page<Cache>> {
    return query(this.endpoint, desnormalizeFilter(params), pageable).pipe(
      map((data: any) => normalizePage(data)),
    );
  }

  public static delete(id: string): Observable<void> {
    return destroy(this.endpoint, id);
  }

  public static deleteBy(params: any): Observable<void> {
    return destroyBy(this.endpoint, params);
  }

  public static deleteAll(): Observable<void> {
    return destroyAll(this.endpoint);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/fotos/caches`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<Cache> {
  const page = new Page<Cache>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push(normalizeCache(model));
  });

  return page;
}

function normalizeCache(model: any): Cache {
  return {
    id: model.id,
    tipoServico: model.origem,
    rg: model.rg,
    cpf: model.cpf,
    tempoExpiracao: model.expira,
    conteudo: model.base64,
  };
}

function desnormalizeFilter(from: FiltroCache): any {
  return {
    origem: from.tiposServicos,
  };
}
