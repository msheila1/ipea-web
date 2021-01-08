import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuditoriaCarga,
  FiltroAuditoriaCarga,
  Pageable,
} from '@/models';
import { AbstractService, listBy, insert } from '@/services';
import { query } from '@/services/abstract.service';

export class AuditoriaCargasService {

  public static list(params: FiltroAuditoriaCarga): Observable<AuditoriaCarga[]> {
    const suffix = params && params.dataCriacao ? 'batimento-replicas-data' : 'batimento-replicas';

    return listBy(`${this.endpoint}/${suffix}`, normalizeFilter(params)).pipe(
      map((result: any) => normalizeList(result.content)),
    );
  }

  public static listData(): Observable<Date[]> {
    return query(`${this.endpoint}/batimento-datas`, {}, new Pageable(1, 10)).pipe(
      map((page: any) => normalizeData(page)),
    );
  }

  public static update(): Observable<AuditoriaCarga[]> {
    return insert(`${this.endpoint}/batimento-run-job`, {} as AuditoriaCarga).pipe(
      map((result: any) => normalizeList(result.content)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/batch`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeFilter(params: any): any {
  return {
    data: params.dataCriacao,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeList(models: any[]): AuditoriaCarga[] {
  const list: AuditoriaCarga[] = [];

  models.forEach((model: any) => {
    list.push({
      id: model.id,
      origem: {
        id: model.id,
        nome: model.tabelas,
        totalConfidencial: model.totalConfidencialConsolidado || 0,
        total: model.totalConsolidado || 0,
        dataUltimaInclusao: model.dataInclusao,
        dataConsolidacao: model.dataConsolidadoCarga,
        situacaoConsolidacao: model.situacaoConsolidado,
      },
      destino: {
        id: model.id,
        nome: model.tabelas,
        totalConfidencial: model.totalConfidencialElasticSearch || 0,
        total: model.totalElasticSearch || 0,
        dataUltimaInclusao: model.dataElasticSearchCarga,
        dataConsolidacao: model.dataConsolidadoCarga,
        situacaoConsolidacao: model.situacaoConsolidado,
      },
    });
  });

  return list;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeData(page: any = []): Date[] {
  return page && page.data;
}
