import { Observable } from 'rxjs';

import { Foto } from '@/models';
import { AbstractService, findById } from '@/services';

export class ImabService {

  public static findByCpf(cpf: string): Observable<Foto> {
    return findById(this.endpoint, cpf);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/fotos/imab`;
  }
}
