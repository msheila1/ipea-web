import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FiltroReconhecedor, Reconhecedor } from '@/models';
import { AbstractService, listBy } from '@/services';

export class ReconhecedoresService {

  public static list(filter: FiltroReconhecedor): Observable<Reconhecedor[]> {
    return listBy(`${this.endpoint}`, normalizeFilter(filter)).pipe(
      map((result: any) => normalizeResult(result)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/ocorrencias/pessoasEnvolvidas`;
  }
}

function normalizeFilter(filter: FiltroReconhecedor): any {
  return {
    idOcorrencia: filter.ocorrencia.id,
    nome: filter.nome,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeResult(result: any[] = []): Reconhecedor[] {
  const data: Reconhecedor[] = [];

  result.forEach((model: any) => {
    data.push({
      id: model.id,
      rg: model.rg,
      cpf: model.cpf,
      nome: model.nome,
      nomeMae: model.nome_mae,
      nomePai: model.nome_pai,
      dataNascimento: model.data_nascimento,
      tipoPessoa: model.tipo_pessoa,
      codigoTipoPessoa: model.id_tipo_pessoa,
    } as Reconhecedor);
  });

  return data;
}
