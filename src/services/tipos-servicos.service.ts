import { Observable, of } from 'rxjs';

import { TipoServico } from '@/models';

const all: TipoServico[] = [
  { id: 1, codigo: 1, descricao: 'Foto IMAB-RG', external: true, cacheable: true },
  { id: 2, codigo: 2, descricao: 'Foto ALPHA', external: true, cacheable: true },
  { id: 3, codigo: 3, descricao: 'Foto DETECTA', external: true, cacheable: true },
  { id: 4, codigo: 4, descricao: 'Foto IMAB', external: true, cacheable: true },
  { id: 5, codigo: 5, descricao: 'Foto PHOENIX', external: true, cacheable: true },
  { id: 6, codigo: 6, descricao: 'IBM WATSON', external: true, cacheable: false },
  { id: 7, codigo: 7, descricao: 'RDO Impressão B.O.', external: true, cacheable: false },
  { id: 8, codigo: 8, descricao: 'LPR DETECTA', external: true, cacheable: false },
  { id: 9, codigo: 1, descricao: 'Ocorrências', external: false, cacheable: false },
  { id: 10, codigo: 2, descricao: 'Pessoas', external: false, cacheable: false },
  { id: 11, codigo: 3, descricao: 'Veículos', external: false, cacheable: false },
];

export class TiposServicosService {

  // TODO Verificar no backend para saber se há mudanças, pois mesclei os tipos de serviços
  public static listAll(): Observable<TipoServico[]> {
    return of(all);
  }

  public static lookup(codigo: number, external: boolean = true): TipoServico {
    const filtered = all.filter((tipoServico) => tipoServico.codigo === codigo && tipoServico.external === external);
    return filtered && filtered.length ? filtered[0] : new TipoServico();
  }
}
