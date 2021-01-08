import { Observable, of } from 'rxjs';
import { TipoResposta } from '@/models';

const all: TipoResposta[] = [
  { id: 1, codigo: 1, descricao: 'OK' },
  { id: 2, codigo: 2, descricao: 'Timeout' },
  { id: 3, codigo: 3, descricao: 'Indisponível' },
  { id: 10, codigo: 10, descricao: 'Parâmetros de pesquisa ausente' },
  { id: 22, codigo: 22, descricao: 'Erro na aplicação' },
  { id: 55, codigo: 55, descricao: 'Ocorrência não encontrada' },
  { id: 60, codigo: 60, descricao: 'Ocorrência de referência não tem os dados necessário para o cálculo de região' },
  { id: 61, codigo: 61, descricao: 'Ocorrência de corelação não tem os dados necessário para o cálculo de região' },
  { id: 66, codigo: 66, descricao: 'Dados para cálculo de região ausentes' },
];

export class TiposRespostasService {

  public static listAll(): Observable<TipoResposta[]> {
    return of(all);
  }

  public static lookup(codigo: number): TipoResposta {
    const filtered = all.filter((tipoResposta) => tipoResposta.codigo === codigo);
    return filtered && filtered.length ? filtered[0] : new TipoResposta();
  }
}
