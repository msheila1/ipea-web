import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FiltroFoto, Foto, Pageable } from '@/models';
import { AbstractService, query } from '@/services';

export class FotosService {

  public static list(filter: FiltroFoto): Observable<Foto[]> {
    return query(this.endpoint, filter, new Pageable(1, 50)).pipe(
      map((page: any) => normalize(page)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/fotos`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalize(fromPage: any): Foto[] {
  const models: Foto[] = [];

  fromPage.data.forEach((model: any) => {
    models.push({
      id: model.id,
      base64: model.base64,
      origem: model.origem,
      codigoOrigem: model.codigoOrigem,
      expiraEnum: model.expiraEnum,
      error: model.expiraEnum === 'TIMEOUT' ? new Error('TIMEOUT da FOTO') : null,
    } as Foto);
  });
  return models;
}
