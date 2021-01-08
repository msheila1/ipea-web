import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuditoriaServico,
  FiltroAuditoriaServico,
  Page,
  Pageable,
} from '@/models';
import { AbstractService, query } from '@/services';
import { TiposServicosService } from '@/services/tipos-servicos.service';
import { TiposRespostasService } from '@/services/tipos-respostas.service';

export class AuditoriaServicosService {

  public static query(params: FiltroAuditoriaServico, pageable: Pageable): Observable<Page<AuditoriaServico>> {
    return query(this.endpoint, normalizeParams(params), pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/auditoria/auditoria-metricas`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeParams(fromParams: any = {}): any {
  return {
    dataHoraInicio: fromParams.dataInicial,
    dataHoraFim: fromParams.dataFinal,
    idsResultados: fromParams.tiposRespostas,
    idsTipoServico: fromParams.tiposServicos,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<AuditoriaServico> {
  const page = new Page<AuditoriaServico>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push({
      id: model.id,
      tipoServico: TiposServicosService.lookup(model.tipoServico),
      usuarioSolicitante: model.rgUsuario,
      dataRequisicao: model.dataHoraInicio,
      conteudoRequisicao: model.dadosEnvio,
      dataResposta: model.dataHoraFim,
      conteudoResposta: model.dadosRetorno,
      tipoResposta: TiposRespostasService.lookup(model.resultado),
    });
  });

  return page;
}
