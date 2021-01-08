import { Observable } from 'rxjs';

import { OutroNome, Page, Pageable } from '@/models';
import { AbstractService, query } from '@/services';

export class OutrosNomesService {

  public static query(params: any, pageable: Pageable): Observable<Page<OutroNome>> {
    return query(this.endpoint, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listOutrosNomes(pessoaId: string, params: any, pageable: Pageable): Observable<Page<OutroNome>> {
    // tslint:disable-next-line:max-line-length
    return query(`${AbstractService.baseUrl}/pessoas/${pessoaId}/outros-nomes?sort=alcunha.keyword`, params, pageable);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/outros-nomes`;
  }
}
