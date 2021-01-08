import { Observable } from 'rxjs';

import { Alcunha, Page, Pageable } from '@/models';
import { AbstractService, query } from '@/services';

export class AlcunhasService {

  public static query(params: any, pageable: Pageable): Observable<Page<Alcunha>> {
    return query(this.endpoint, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listAlcunhas(pessoaId: string, params: any, pageable: Pageable): Observable<Page<Alcunha>> {
    // tslint:disable-next-line:max-line-length
    return query(`${AbstractService.baseUrl}/pessoas/${pessoaId}/criminais-alcunhas?sort=alcunha.keyword`, params, pageable);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/alcunhas`;
  }
}
