import { Observable } from 'rxjs';

import { Delegacia, Page, Pageable } from '@/models';
import { AbstractService, listBy, query } from '@/services';
import { map } from 'rxjs/operators';

export class DelegaciasService {

  public static query(params: any): Observable<Page<Delegacia>> {
    return query(this.endpoint, params, new Pageable());
  }

  public static list(params: any): Observable<Delegacia[]> {
    return listBy(this.endpoint, { ...params, counted: true }).pipe(
      map((page: any) => normalizeDelegacia(page.content)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/dominio/delegacias`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeDelegacia(from: any = []): Delegacia[] {
  const delegacias: Delegacia[] = [];

  from.forEach((model: any) => {
    delegacias.push({
      id: model.id_delegacia,
      codigo: model.id_delegacia,
      nome: model.nome,
      nomeFantasia: model.nome_fantasia,
    } as Delegacia);
  });

  return delegacias;
}
