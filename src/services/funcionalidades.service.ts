import { Observable, of } from 'rxjs';

const all: any[] = [
  { id: 1, codigo: 1, descricao: 'Consulta' },
  { id: 2, codigo: 2, descricao: 'Detalhe' },
];

export class FuncionalidadesService {

  public static listAll(): Observable<any[]> {
    return of(all);
  }

  public static lookup(codigo: number): any {
    const filtered = all.filter((tipoServico) => tipoServico.codigo === codigo);
    return filtered && filtered.length ? filtered[0] : {};
  }
}
