import { Observable } from 'rxjs';

import { TipoVeiculo } from '@/models';
import { AbstractService, listAll } from '@/services';

export class TiposVeiculosService {

  public static listAll(): Observable<TipoVeiculo[]> {
    return listAll(this.endpoint);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/dominio/tipos-veiculos`;
  }
}
