import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IncidenciaPenal, Mandado, Page, Pageable, ProcessoPena } from '@/models';
import { AbstractService, query } from '@/services';

export class MandadosService {

  public static query(params: any, pageable: Pageable): Observable<Page<Mandado>> {
    return query(this.endpoint, params, pageable);
  }

  // tslint:disable-next-line:max-line-length
  public static listMandados(pessoaId: string, params: any, pageable: Pageable): Observable<Page<Mandado>> {
    // tslint:disable-next-line:max-line-length
    return query(`${AbstractService.baseUrl}/pessoas/${pessoaId}/criminais-mandados?sort=dataFato,numero,desc`, params, pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/mandados`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<Mandado> {
  const page = new Page<Mandado>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push({
      id: model.id,
      numeroProcesso: model.numeroProcesso,
      anoProcesso: model.anoProcesso,
      autoridadeJudiciaria: model.autoridadeJudiciaria,
      classificacao: model.classificacao,
      situacao: model.situacao,
      dataExpedicao: model.dataExpedicao,
      confidencial: model.confidencial,
      incidenciaPenal: normalizeIncidenciaPenal(model),
      pena: normalizePena(model),
    } as Mandado);
  });

  return page;
}


// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeIncidenciaPenal(mandado: any): IncidenciaPenal {
  if (!mandado) {
    return mandado;
  }

  const incidenciaPenal: IncidenciaPenal = new IncidenciaPenal();
  incidenciaPenal.artigo = mandado.artigo;
  incidenciaPenal.legislacao = mandado.legislacao;
  incidenciaPenal.paragrafo = mandado.paragrafo;
  incidenciaPenal.inciso = mandado.inciso;

  return incidenciaPenal;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePena(mandado: any): ProcessoPena {
  if (!mandado) {
    return mandado;
  }

  const incidenciaPenal: ProcessoPena = new ProcessoPena();
  incidenciaPenal.dia = mandado.penaDia;
  incidenciaPenal.mes = mandado.penaMes;
  incidenciaPenal.ano = mandado.penaAno;
  incidenciaPenal.tipo = mandado.tipoPena;

  return incidenciaPenal;
}
