import { Observable } from 'rxjs';

import {
  LocalVeiculo,
  Page,
  Pageable,
} from '@/models';
import { AbstractService, query } from '@/services';

export class LocaisVeiculosService {

  public static query(veiculoId: string, pageable: Pageable): Observable<Page<LocalVeiculo>> {
    return query(`${this.endpoint}/${veiculoId}/locais`, {}, pageable);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/veiculos`;
  }
}
