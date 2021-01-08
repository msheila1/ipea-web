import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

import {
  AutoReconhecimento,
  Delegacia,
  Delegado,
  Documento,
  Escrivao,
  Ocorrencia,
  Page,
  Pageable,
  Reconhecedor,
  Suspeito,
} from '@/models';
import { AbstractService, download, findBy, findById, insert, query } from '@/services';

export class AutosReconhecimentosService {

  public static insert(model: AutoReconhecimento): Observable<AutoReconhecimento> {
    return insert(`${this.endpoint}/laudos`, desnormalizeAutoReconhecimento(model)).pipe(
      map((result: any) => normalizeAutoReconhecimento(result)),
    );
  }

  public static query(params: any, pageable: Pageable): Observable<Page<AutoReconhecimento>> {
    return query(`${this.endpoint}/laudos`, normalizeParams(params), pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  public static findById(id: string): Observable<AutoReconhecimento> {
    return findById(this.endpoint, id);
  }

  public static view(params: any): Observable<AutoReconhecimento> {
    return findBy(this.endpoint, { ...params, responseType: 'arraybuffer' });
  }

  public static download(autoReconhecimento: AutoReconhecimento): Observable<Documento> {
    const params = {
      anoBO: autoReconhecimento.ocorrencia.ano,
      numeroBo: autoReconhecimento.ocorrencia.numero,
      idDelegacia: autoReconhecimento.ocorrencia.delegacia.id,
      nomeDelegacia: autoReconhecimento.ocorrencia.delegacia.nome,
      dataIdentificacao: autoReconhecimento.dataIdentificacao,
      rubricas: autoReconhecimento.rubricas,
      nome: autoReconhecimento.reconhecedor.nome,
      delegado: autoReconhecimento.delegado.nome,
      escrivao: autoReconhecimento.escrivao.nome,
    };

    return download(`${this.endpoint}/autoreconhecimento`, params).pipe(
      map((data: any) => {
        return new Documento('Auto de Reconhecimento Fotográfico', new Blob([data], {type: 'application/pdf'}));
      }),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/ocorrencias`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeParams(fromParams: any): any {
  if (!fromParams) { return fromParams; }
  return {
    numeroBo: fromParams.ocorrencia.numero,
    anoBo: fromParams.ocorrencia.ano,
    idDelegacia: fromParams.ocorrencia.delegacia.id,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any): Page<AutoReconhecimento> {
  const page = new Page<AutoReconhecimento>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push(normalizeAutoReconhecimento(model));
  });

  return page;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeAutoReconhecimento(model: any): AutoReconhecimento {
  return {
    id: model.id,
    ocorrencia: normalizeOcorrencia(model),
    reconhecedor: normalizeReconhecedor(model),
    dataIdentificacao: model.dataIdentificacao,
    delegado: normalizeDelegado(model),
    escrivao: normalizeEscrivao(model),
    rubricas: model.rubricas,
  } as AutoReconhecimento;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeReconhecedor(model: any): Reconhecedor {
  return {
    rg: model.rg,
    cpf: model.cpf,
    nome: model.nome,
    nomeMae: model.nome_mae || model.nomeMae,
    nomePai: model.nome_pai || model.nomePai,
    dataNascimento: model.data_nascimento || model.dataNascimento,
    codigoTipoPessoa: model.id_tipo_pessoa || model.codigoTipoPessoa,
    tipoPessoa: model.tipo_pessoa || model.tipoPessoa,
  } as Reconhecedor;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeOcorrencia(model: any): Ocorrencia {
  return {
    numero: model.numeroBo,
    ano: model.anoBO,
    delegacia: normalizeDelegacia(model),
  } as Ocorrencia;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeDelegacia(model: any): Delegacia | null {
  if (model.idDelegacia || model.nomeDelegacia) {
    return {
      id: model.idDelegacia,
      codigo: model.idDelegacia,
      nome: model.nomeDelegacia,
    } as Delegacia;
  }

  return null;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
// TODO Verificar o pq não está salvando o id (rg) do delegado, pois o
// nome pode ser alterado a qualquer momento.
function normalizeDelegado(model: any): Delegado {
  return {
    id: model.nomeDelegado,
    nome: model.nomeDelegado,
  } as Delegado;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
// TODO Verificar o pq não está salvando o id (rg) do escrivão, pois o
// nome pode ser alterado a qualquer momento.
function normalizeEscrivao(model: any): Escrivao {
  return {
    id: model.nomeEscrivao,
    nome: model.nomeEscrivao,
  } as Escrivao;
}

function desnormalizeAutoReconhecimento(model: AutoReconhecimento): any {
  return {
    numeroBo: model.ocorrencia.numero,
    anoBO: model.ocorrencia.ano,
    idDelegacia: model.ocorrencia.delegacia.id,
    nomeDelegacia: model.ocorrencia.delegacia.nome,
    rg: model.reconhecedor.rg,
    cpf: model.reconhecedor.cpf,
    nome: model.reconhecedor.nome,
    nomeMae: model.reconhecedor.nomeMae,
    nomePai: model.reconhecedor.nomePai,
    dataNascimento: model.reconhecedor.dataNascimento,
    codigoTipoPessoa: model.reconhecedor.codigoTipoPessoa,
    tipoPessoa: model.reconhecedor.tipoPessoa,
    nomeDelegado: model.delegado.nome,
    nomeEscrivao: model.escrivao.nome,
    rubricas: model.rubricas,
    reconhecidos: desnormalizeReconhecidos(model.reconhecidos),
  };
}

function desnormalizeReconhecidos(suspeitos: Suspeito[]): any {
  const reconhecidos: any[] = [];
  let fotoSelecionada = null;

  suspeitos.forEach((reconhecido: Suspeito) => {
    fotoSelecionada = _.filter(reconhecido.fotos, ['selecionada', true])[0];

    reconhecidos.push({
      numeroBo: reconhecido.ocorrencia.numero,
      anoBO: reconhecido.ocorrencia.ano,
      idDelegacia: reconhecido.ocorrencia.delegacia.id,
      nomeDelegacia: reconhecido.ocorrencia.delegacia.nome,
      rg: reconhecido.rg,
      cpf: reconhecido.cpf,
      nome: reconhecido.nome,
      base64: fotoSelecionada.base64,
      foto: fotoSelecionada.base64,
      origemFoto: fotoSelecionada.codigoOrigem,
    });
  });

  return reconhecidos;
}
