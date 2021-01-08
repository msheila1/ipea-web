import { Observable } from 'rxjs';

import { CorVeiculo } from '@/models';
import { AbstractService, listAll } from '@/services';



export class CoresVeiculosService {

  public static listAll(): Observable<CorVeiculo[]> {
    return listAll(this.endpoint);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/dominio/cores-veiculos`;
  }
}
