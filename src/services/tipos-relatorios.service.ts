import { Observable, of } from 'rxjs';

import { TipoRelatorio } from '@/models';

const all: TipoRelatorio[] = [
  { id: 1, codigo: 1, descricao: 'Auditoria Analítica'},
  { id: 2, codigo: 2, descricao: 'Acessos por Funcionalidade'},
  { id: 3, codigo: 3, descricao: 'Acessos por Serviço'},
  { id: 4, codigo: 4, descricao: 'Acessos por Usuário'},
];

export class TiposRelatoriosService {

  public static listAll(): Observable<TipoRelatorio[]> {
    return of(all);
  }

  public static lookup(codigo: number): TipoRelatorio {
    const filtered = all.filter((tipoRelatorio) => tipoRelatorio.codigo === codigo);
    return filtered && filtered.length ? filtered[0] : new TipoRelatorio();
  }
}
