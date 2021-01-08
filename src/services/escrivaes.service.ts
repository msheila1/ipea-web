import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Escrivao, FiltroEscrivao, Page, Pageable } from '@/models';
import { AbstractService, query } from '@/services';

export class EscrivaesService {

  public static query(filter: FiltroEscrivao, pageable: Pageable): Observable<Page<Escrivao>> {
    return query(`${this.endpoint}`, normalizeFilter(filter), pageable);
  }

  public static list(filter: FiltroEscrivao): Observable<Escrivao[]> {
    return query(`${this.endpoint}`, normalizeFilter(filter), new Pageable(1, 20)).pipe(
      map((page: any) => normalizeResult(page.data)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/pessoas/usuario/perfil`;
  }
}

function normalizeFilter(filter: FiltroEscrivao) {
  return {
    ...filter,
    perfil: 'ESCRIVAO',
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeResult(result: any = []): Escrivao[] {
  const data: Escrivao[] = [];

  result.forEach((model: any) => {
    data.push({
      id: model.id,
      nome: model.nome,
      rg: model.rg,
    } as Escrivao);
  });

  return data;
}
