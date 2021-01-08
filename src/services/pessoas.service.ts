import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CaracteristicaFisica,
  Cnh,
  Criminal,
  Delegacia,
  Endereco,
  NaturezaOcorrencia,
  Ocorrencia,
  Page,
  Pageable,
  Pessoa,
} from '@/models';
import { AbstractService, findBy, findById, query } from '@/services';

export class PessoasService {

  public static query(params: any, pageable: Pageable): Observable<Page<Pessoa>> {
    return query(this.endpoint, params, pageable);
  }

  public static findById(id: string): Observable<Pessoa> {
    return findById(this.endpoint, id).pipe(
      map((data: any) => normalizePessoa(data)),
    );
  }

  public static findCnhById(params: any, pessoaId: string): Observable<Cnh> {
    return findBy(`${this.endpoint}/${pessoaId}/cnhs`, params).pipe(
      map((data: any) => normalizeCnh(data)),
    );
  }

  public static findCriminalById(id: any, pessoaId: string): Observable<Criminal> {
    return findById(`${this.endpoint}/${pessoaId}/criminais`, id).pipe(
      map((data: any) => normalizeCriminal(data)),
    );
  }

  public static listOcorrencias(params: any, pessoaId: string, pageable: Pageable): Observable<Page<Ocorrencia>> {
    // tslint:disable-next-line:max-line-length
    return query(`${this.endpoint}/${pessoaId}/ocorrencias-relacionados?sort=numero_bo,ano_bo,desc`, params, pageable).pipe(
      map((data: any) => normalizeOcorrenciaPage(data)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/pessoas`;
  }
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeCnh(model: any): Cnh {
  return {
    id: model.id,
    registro: model.registro,
    dataEmissao: model.dataEmissao,
    dataValidade: model.dataValidade,
    categoria: model.categoria,
    condutor: model.nome,
    dataNascimento: model.dataNascimento,
    rgOrgao: model.rgOrgao,
    endereco: normalizeCnhEndereco(model),
    confidencial: model.confidencial,
  } as Cnh;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeCnhEndereco(model: any): Endereco {
  return {
    logradouro: model.logradouro,
    numero: model.numero,
    complemento: model.complemento,
    bairro: model.bairro,
    municipio: model.municipio,
    cep: model.cep,
  } as Endereco;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePessoa(model: any): Pessoa {
  return {
    id: model.id,
    cpf: model.cpf,
    rg: model.rg,
    rgDc: model.rgDc,
    rgSequencia: model.rgSequencia,
    nome: model.nome,
    nomeMae: model.nomeMae,
    nomePai: model.nomePai,
    dataNascimento: model.dataNascimento,
    naturalidade: model.naturalidade,
    naturalizado: model.naturalizado,
    sexo: model.sexo,
    estadoCivil: model.estadoCivil,
    grauInstrucao: model.grauInstrucao,
    profissao: model.profissao,
    codigoSituacao: model.situacao,
    situacao: model.situacao,
    origem: model.type,
    caracteristicaFisica: normalizeCaracteristicaFisica(model),
    enderecoResidencial: normalizeEnderecoResidencial(model),
    enderecoComercial: normalizeEnderecoComercial(model),
    confidencial: model.confidencial,
  } as Pessoa;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeCaracteristicaFisica(model: any): CaracteristicaFisica {
  return {
    cabelo: model.cabelo,
    olhos: model.olhos,
    pele: model.pele,
  } as CaracteristicaFisica;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeEnderecoResidencial(model: any): Endereco {
  return {
    logradouro: model.logradouroResidencial,
    numero: model.numeroResidencial,
    complemento: model.complementoResidencia,
    bairro: model.bairroResidencia,
    municipio: model.municipioResidencial,
    cep: model.cepResidencial,
  } as Endereco;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeEnderecoComercial(model: any): Endereco {
  return {
    logradouro: model.logradouroComercial,
    numero: model.numeroComercial,
    complemento: model.complementoComercial,
    bairro: model.bairroComercial,
    municipio: model.municipioComercial,
    cep: model.cepComercial,
  } as Endereco;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeOcorrenciaPage(fromPage: any = new Page()): Page<Ocorrencia> {
  const page = new Page<Ocorrencia>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push({
      id: model.id_ocorrencia,
      numero: model.numero_bo,
      ano: model.ano_bo,
      delegacia: normalizeDelegacia(model),
      naturezas: normalizeNaturezas(model.naturezas),
      data: model.data_ocorrencia,
      envolvimento: model.tipo_pessoa,
      confidencial: model.confidencial,
    } as Ocorrencia);
  });

  return page;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeNaturezas(naturezas: any[] = []): NaturezaOcorrencia[] {
  if (!naturezas) {
    return naturezas;
  }

  const naturezasOcorrencia: NaturezaOcorrencia[] = [];
  naturezas.forEach((natureza) => {
    naturezasOcorrencia.push({
      id: natureza.id,
      legislacao: natureza.legislacao,
      artigo: natureza.artigo,
      rubrica: natureza.rubrica,
    } as NaturezaOcorrencia);
  });

  return naturezasOcorrencia;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeDelegacia(model: any): Delegacia | null {
  if (model.id_delegacia_bo || model.nome_delegacia) {
    return {
      id: model.id_delegacia_bo,
      codigo: model.id_delegacia_bo,
      nome: model.nome_delegacia,
    } as Delegacia;
  }

  return null;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeCriminal(model: any): Criminal {
  return {
    id: model.id,
    rg: model.rg,
    rgDc: model.rgDc,
    nome: model.nome,
    nomeMae: model.nomeMae,
    nomePai: model.nomePai,
    dataNascimento: model.dataNascimento,
    naturalidade: model.naturalidade,
    naturalizado: model.naturalizado,
    sexo: model.sexo,
    estadoCivil: model.estadoCivil,
    grauInstrucao: model.grauInstrucao,
    profissao: model.profissao,
    codigoSituacao: model.codigoSituacao,
    situacao: model.situacao,
    origem: model.type,
    postoIdentificacao: model.postoIdentificacao,
    dataIdentificacao: model.dataIdentificacao,
    caracteristicaFisica: normalizeCaracteristicaFisica(model),
    enderecoResidencial: normalizeEnderecoResidencial(model),
    enderecoComercial: normalizeEnderecoComercial(model),
    confidencial: model.confidencial,
  } as Criminal;
}
