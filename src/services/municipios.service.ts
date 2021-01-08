import { Observable } from 'rxjs';

import { Municipio, Page, Pageable } from '@/models';
import { AbstractService, query } from '@/services';

export class MunicipiosService {

  public static query(params: any): Observable<Page<Municipio>> {
    return query(this.endpoint, params, new Pageable());
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/dominio/municipios`;
  }
}
