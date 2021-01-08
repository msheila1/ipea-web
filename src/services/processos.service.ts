import { Observable } from 'rxjs';

import { Page, Pageable, Processo } from '@/models';
import { AbstractService, query } from '@/services';

export class ProcessosService {

  public static query(params: any, pageable: Pageable): Observable<Page<Processo>> {
    return query(this.endpoint, params, pageable);
  }


  // tslint:disable-next-line:max-line-length
  public static listFetchIncidenciasPenais(pessoaId: string, params: any, pageable: Pageable): Observable<Page<Processo>> {
    // tslint:disable-next-line:max-line-length
    return query(`${AbstractService.baseUrl}/pessoas/${pessoaId}/criminais-processos?sort=dataFato,numero,desc`, params, pageable);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/processos`;
  }
}
