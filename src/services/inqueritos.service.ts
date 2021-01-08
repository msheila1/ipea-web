import { Observable } from 'rxjs';

import { Inquerito, Page, Pageable } from '@/models';
import { AbstractService, query } from '@/services';

export class InqueritosService {

  public static query(params: any, pageable: Pageable): Observable<Page<Inquerito>> {
    return query(this.endpoint, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listFetchIncidenciasPenais(pessoaId: string, params: any, pageable: Pageable): Observable<Page<Inquerito>> {
    // tslint:disable-next-line:max-line-length
    return query(`${AbstractService.baseUrl}/pessoas/${pessoaId}/criminais-inqueritos?sort=dataFato,numero,desc`, params, pageable);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/inqueritos`;
  }
}
