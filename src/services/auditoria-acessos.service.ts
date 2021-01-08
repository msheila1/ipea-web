import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TipoRelatorioEnum } from '@/enums';
import {
  AuditoriaAcesso,
  FiltroAuditoriaAcesso,
  Page,
  Pageable,
} from '@/models';
import { AbstractService, FuncionalidadesService, TiposServicosService, query } from '@/services';

export class AuditoriaAcessosService {

  public static query(params: FiltroAuditoriaAcesso, pageable: Pageable): Observable<Page<AuditoriaAcesso>> {
    return query(this.factoryEndpoint(params.tipoRelatorio), normalizeParams(params), pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  private static factoryEndpoint(tipoRelatorio: number): string {
    let endpoint = '';

    if (TipoRelatorioEnum.AUDITORIA_ANALITICA === tipoRelatorio) {
      endpoint = `${AbstractService.baseUrl}/auditoria/auditorias`;

    } else if (TipoRelatorioEnum.ACESSOS_POR_FUNCIONALIDADE === tipoRelatorio) {
      endpoint = `${AbstractService.baseUrl}/auditoria/acessos-funcionalidade`;

    } else if (TipoRelatorioEnum.ACESSOS_POR_SERVICO === tipoRelatorio) {
      endpoint = `${AbstractService.baseUrl}/auditoria/acessos-servico`;

    } else if (TipoRelatorioEnum.ACESSOS_POR_USUARIO === tipoRelatorio) {
      endpoint = `${AbstractService.baseUrl}/auditoria/acessos-usuario`;
    }

    return endpoint;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeParams(fromParams: any = {}): any {
  return {
    dataHoraInicio: fromParams.dataInicial,
    dataHoraFim: fromParams.dataFinal,
    nomeUsuario: fromParams.nomeUsuario,
    tipoRelatorio: fromParams.tipoRelatorio,
    idsServico: fromParams.tiposServicos,
    idsServicos: fromParams.tiposServicos,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<AuditoriaAcesso> {
  const page = new Page<AuditoriaAcesso>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push({
      id: model.id,
      tipoServico: TiposServicosService.lookup(model.servico, false),
      funcionalidade: FuncionalidadesService.lookup(model.funcionalidade),
      rgUsuario: model.rgUsuario,
      nomeUsuario: model.nomeUsuario,
      dataRequisicao: model.dataHoraCriacao,
      conteudoRequisicao: model.dadosDeEnvio,
      dataResposta: model.dataHoraEnvio,
      conteudoResposta: model.retornoEnvio,
      status: model.status,
      totalAcessos: model.totalAcesso,
    });
  });

  return page;
}
