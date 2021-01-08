import { Observable } from 'rxjs';

import { Page, Pageable, Endereco } from '@/models';
import { AbstractService, query } from '@/services';

export class EnderecosService {

  public static query(params: any, pageable: Pageable): Observable<Page<Endereco>> {
    return query(this.endpoint, params, pageable);
  }

    // tslint:disable-next-line:max-line-length
    public static listEnderecos(pessoaId: string, params: any, pageable: Pageable): Observable<Page<Endereco>> {
      // tslint:disable-next-line:max-line-length
      return query(`${AbstractService.baseUrl}/pessoas/${pessoaId}/enderecos`, params, pageable);
    }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/enderecos`;
  }
}
