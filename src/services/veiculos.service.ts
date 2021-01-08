import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

import {
  Endereco,
  HistoricoVeiculo,
  LocalVeiculo,
  Ocorrencia,
  Page,
  Pageable,
  ProprietarioVeiculo,
  Veiculo,
  FiltroLocalVeiculo,
} from '@/models';
import { AbstractService, findById, query } from '@/services';

export class VeiculosService {

  public static query(params: any, pageable: Pageable): Observable<Page<Veiculo>> {
    return query(`${this.endpoint}`, normalizeFilter(params), pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  public static queryAnteriores(params: any, pageable: Pageable): Observable<Page<Veiculo>> {
    return query(`${this.endpoint}/veiculos-anteriores`, params, pageable);
  }

  public static queryHistorico(veiculoId: string, pageable: Pageable): Observable<Page<HistoricoVeiculo>> {
    return query(`${this.endpoint}/${veiculoId}/historicos`, {}, pageable).pipe(
      map((page: any) => normalizePageHistorico(page)),
    );
  }

  public static queryLocal(filter: FiltroLocalVeiculo, pageable: Pageable): Observable<Page<LocalVeiculo>> {
    return query(`${this.endpoint}/${filter.veiculoId}/locais`, normalizeFiltroLocalVeiculo(filter), pageable);
  }

  public static queryOcorrencia(veiculoId: string, pageable: Pageable): Observable<Page<Ocorrencia>> {
    return query(`${this.endpoint}/${veiculoId}/ocorrencias`, {}, pageable);
  }

  public static findById(id: string): Observable<Veiculo> {
    return findById(this.endpoint, id).pipe(
      map((data: any) => normalizeVeiculo(data)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/veiculos`;
  }
}

function normalizeFilter(filter: any): any {
  return {
    ...filter,
  };
}

function normalizeFiltroLocalVeiculo(filter: any): any {
  return {
    periodoInicial: moment(filter.dataInicial, 'YYYY-MM-DD HH:mm').format(),
    periodoFinal: moment(filter.dataFinal, 'YYYY-MM-DD HH:mm').format(),
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(result: any = new Page()): Page<Veiculo> {
  if (!result || !result.data) {
    return new Page<Veiculo>();
  }

  const page = new Page<Veiculo>();
  page.count = result.count;

  result.data.forEach((model: any) => {
    page.data.push(normalizeVeiculo(model));
  });

  return page;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeVeiculo(model: any): Veiculo {
  return {
    id: model.id,
    placa: model.placa,
    chassi: model.chassi,
    marca: model.marca,
    cor: model.cor,
    anoFabricacao: model.anoFabricacao,
    anoModelo: model.anoModelo,
    tipo: model.tipo,
    municipio: model.municipio,
    uf: model.uf,
    natureza: model.natureza,
    envolvimento: model.envolvimento,
    categoria: model.categoria,
    carroceria: model.carroceria,
    especie: model.especie,
    renavam: model.renavam,
    confidencial: model.confidencial,
    proprietarioAtual: normalizeProprietarioAtual(model),
    proprietarioAnterior: normalizeProprietarioAnterior(model),
  } as Veiculo;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeProprietarioAtual(model: any): ProprietarioVeiculo {
  return {
    id: model.idPessoaProprietario,
    idPessoa: model.idPessoaProprietario,
    nome: model.proprietario,
    rg: model.rgProprietario,
    rgUf: model.rgUfProprietario,
    rgOrgao: model.rgOrgaoProprietario,
    codigoTipoDocumento: model.tipoDocumentoCpfCnpjProprietario,
    tipoDocumento: normalizeTipoDocumento(model.tipoDocumentoCpfCnpjProprietario),
    numeroDocumento: model.cpfCnpjProprietario,
    telefone: model.telefoneProprietario,
    confidencial: model.confidencial,
    endereco: {
      logradouro: model.logradouroProprietario,
      numero: model.numeroProprietario,
      complemento: model.complementoProprietario,
      bairro: model.bairroProprietario,
      municipio: model.municipioProprietario,
      uf: model.ufProprietario,
      cep: model.cepProprietario,
    } as Endereco,
  } as ProprietarioVeiculo;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeProprietarioAnterior(model: any): ProprietarioVeiculo {
  return {
    id: model.idPessoaProprietarioAnterior,
    idPessoa: model.idPessoaProprietarioAnterior,
    nome: model.proprietarioAnterior,
    rg: model.rgProprietarioAnterior,
    rgUf: model.rgUfProprietarioAnterior,
    rgOrgao: model.rgOrgaoProprietarioAnterior,
    codigoTipoDocumento: model.tipoDocumentoCpfCnpjProprietarioAnterior,
    tipoDocumento: normalizeTipoDocumento(model.tipoDocumentoCpfCnpjProprietarioAnterior),
    numeroDocumento: model.cpfCnpjProprietarioAnterior,
    telefone: model.telefoneProprietario,
    confidencial: model.confidencialProprietarioAnterior,
    endereco: {
      logradouro: model.logradouroProprietarioAnterior,
      numero: model.numeroProprietarioAnterior,
      complemento: model.complementoProprietarioAnterior,
      bairro: model.bairroProprietarioAnterior,
      municipio: model.municipioProprietarioAnterior,
      uf: model.ufProprietarioAnterior,
      cep: model.cepProprietarioAnterior,
    } as Endereco,
  } as ProprietarioVeiculo;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePageHistorico(result: any = new Page()): Page<HistoricoVeiculo> {
  const page = new Page<HistoricoVeiculo>();
  page.count = result.count;

  result.data.forEach((model: any) => {
    page.data.push(normalizeHistoricoVeiculo(model));
  });

  return page;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeHistoricoVeiculo(model: any): HistoricoVeiculo {
  return {
    rgProprietario: model.rgProprietario,
    nomeProprietario: model.nomeProprietario,
    codigoTipoDocumento: model.tipoDocumentoCpfCnpj,
    tipoDocumento: normalizeTipoDocumento(model.tipoDocumentoCpfCnpj),
    numeroDocumento: model.documentoCpfCnpj,
    municipioVeiculo: model.municipioVeiculo,
    descricaoTransacao: model.descricaoTransacao,
    dataInclusaoProprietarios: model.dataInclusaoProprietarios,
    endereco: {
      logradouro: model.logradouroProprietario,
      numero: model.numeroProprietario,
      complemento: model.complementoProprietario,
      bairro: model.bairroProprietario,
      municipio: model.municipioProprietario,
      cep: model.cepProprietario,
    } as Endereco,
  } as HistoricoVeiculo;
}

function normalizeTipoDocumento(codigoTipoDocumento: number): string {
  if (codigoTipoDocumento === 1) {
    return 'CPF';
  }

  return codigoTipoDocumento === 2 ? 'CNPJ' : '';
}
