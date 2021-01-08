import { Observable } from 'rxjs';

import { Delegado, FiltroDelegado, Page, Pageable } from '@/models';
import { AbstractService, query } from '@/services';
import { map } from 'rxjs/operators';

export class DelegadosService {

  public static query(filter: FiltroDelegado, pageable: Pageable): Observable<Page<Delegado>> {
    return query(this.endpoint, normalizeFilter(filter), pageable);
  }

  public static list(filter: FiltroDelegado): Observable<Delegado[]> {
    return query(`${this.endpoint}`, normalizeFilter(filter), new Pageable(1, 20)).pipe(
      map((page: any) => normalizeResult(page.data)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/pessoas/usuario/perfil`;
  }
}

function normalizeFilter(filter: FiltroDelegado) {
  return {
    ...filter,
    perfil: 'DELEGADO',
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeResult(result: any = []): Delegado[] {
  const data: Delegado[] = [];

  result.forEach((model: any) => {
    data.push({
      id: model.id,
      nome: model.nome,
      rg: model.rg,
    } as Delegado);
  });

  return data;
}
