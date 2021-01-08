import { Observable } from 'rxjs';

import { ReceitaFederal, Page, Pageable } from '@/models';
import { AbstractService, query, findBy } from '@/services';

export class OutroCadastroService {

  public static query(params: any, pageable: Pageable): Observable<Page<ReceitaFederal>> {
    return query(this.endpoint, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listOutroCadastro(params: any, pessoaId: string): Observable<ReceitaFederal> {
    // tslint:disable-next-line:max-line-length
    return findBy(`${AbstractService.baseUrl}/pessoas/${pessoaId}/outros-cadastros1`, params);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/outros-cadastros1`;
  }
}
