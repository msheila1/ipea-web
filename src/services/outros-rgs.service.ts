import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OutroRg, Page, Pageable } from '@/models';
import { AbstractService, query, listBy } from '@/services';

export class OutrosRgsService {

  public static query(params: any, pageable: Pageable): Observable<Page<OutroRg>> {
    return query(this.endpoint, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listOutrosRgs(pessoaId: string, params: any): Observable<Page<OutroRg>> {
    // tslint:disable-next-line:max-line-length
    return listBy(`${AbstractService.baseUrl}/pessoas/${pessoaId}/pessoas-agregados`, params).pipe(
      map((data: any) => normalizePessoaList(data)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/outros-rgs`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePessoaList(outrosRgs: any[] = []): Page<OutroRg> {
  const page = new Page<OutroRg>();
  page.count = outrosRgs.length;
  if (!outrosRgs) {
    return page;
  }

  outrosRgs.forEach((rg) => {
    page.data.push({
      id: rg.id,
      numero: rg.rg,
      origem: rg.type,
      confidencial: rg.confidencial,
    } as OutroRg);
  });

  return page;
}
