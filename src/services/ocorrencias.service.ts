import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

import {
  AutoReconhecimento,
  Coordenada,
  Delegacia,
  Delegado,
  Documento,
  Endereco,
  Escrivao,
  NaturezaOcorrencia,
  Ocorrencia,
  Page,
  Pageable,
  Pessoa,
  Veiculo,
  PessoaOcorrencia,
  VeiculoOcorrencia,
} from '@/models';
import { AbstractService, download, findBy, query } from '@/services';

export class OcorrenciasService {

  public static MARKERS_DIR = '/img/map/markers';

  public static query(params: any, pageable: Pageable): Observable<Page<Ocorrencia>> {
    return query(`${this.endpoint}/search`, normalizeParams(params), pageable).pipe(
      map((page: any) => normalizePage(page)),
    );
  }

  public static download(ocorrencia: Ocorrencia): Observable<Documento> {
    const params = {
      anoBo: ocorrencia.ano,
      numBo: ocorrencia.numero,
      idDelegacia: ocorrencia.delegacia.id,
    };

    return download(`${this.endpoint}/imprimirBO`, params).pipe(
      map((data: any) => {
        return new Documento('Boletim de Ocorrência', new Blob([data], {type: 'application/pdf'}));
      }),
    );
  }

  public static queryNatureza(ocorrenciaId: string, pageable: Pageable): Observable<Page<NaturezaOcorrencia>> {
    return query(`${this.endpoint}/${ocorrenciaId}/naturezas`, {}, pageable).pipe(
      map((page: any) => new Page(normalizeNaturezas(page.data), page.count)),
    );
  }

  // tslint:disable-next-line:max-line-length
  public static queryAutoReconhecimento(ocorrenciaId: string, pageable: Pageable): Observable<Page<AutoReconhecimento>> {
    return query(`${this.endpoint}/${ocorrenciaId}/autos-reconhecimentos`, {}, pageable);
  }

  public static queryPessoa(ocorrenciaId: string, pageable: Pageable): Observable<Page<PessoaOcorrencia>> {
    return query(`${this.endpoint}/${ocorrenciaId}/pessoas`, {}, pageable).pipe(
      map((page: any) => new Page(normalizePessoas(page.data), page.count)),
    );
  }

  public static queryVeiculo(ocorrenciaId: string, params: any, pageable: Pageable): Observable<Page<Veiculo>> {
    return query(`${this.endpoint}/${ocorrenciaId}/veiculos`, normalizeParams(params), pageable).pipe(
      map((page: any) => new Page(normalizeVeiculos(page.data), page.count)),
    );
  }

  public static queryVeiculoByPessoa(params: any, pageable: Pageable): Observable<Page<VeiculoOcorrencia>> {
    return query(`${this.endpoint}/veiculos`, normalizeParams(params), pageable).pipe(
      map((page: any) => new Page(normalizeVeiculosByPessoa(page.data), page.count)),
    );
  }

  public static findById(id: string): Observable<Ocorrencia> {
    return findBy(`${this.endpoint}/findByFilter`, { id }).pipe(
      map((data: any) => normalizeOcorrencia(data)),
    );
  }

  // tslint:disable:max-line-length
  public static createCoordenada(ocorrencia: Ocorrencia | any, central: boolean): Coordenada {
    const icone = `${this.MARKERS_DIR}/${central ? 'red' : (ocorrencia.autoriaConhecida ? 'blue' : 'yellow')}.png`;
    const titulo = `${central ? 'Ocorrência Atual' : (ocorrencia.autoriaConhecida ? 'Autor Conhecido' : 'Ocorrência Semelhante')}`;

    let conteudo = `<p class="titulo-map"><strong>${titulo}</strong></p>`;
    conteudo += `Número/Ano: <strong><a href="#/ocorrencias/${ocorrencia.id}/detalhar" target="_blank" title="Clique para abrir o dossiê da ocorrência">${ocorrencia.numero}/${ocorrencia.ano}</a></strong></br>`;
    conteudo += `Delegacia: <strong>${ocorrencia.delegacia && ocorrencia.delegacia.nome}</strong></br>`;

    if (!central) {
      conteudo += `Distância: <strong>${ocorrencia.distancia.toLocaleString('pt-BR')} metros</strong>`;
    }

    return {
      icone,
      titulo,
      conteudo,
      latitude: ocorrencia.latitude,
      longitude: ocorrencia.longitude,
      central,
    } as Coordenada;
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/ocorrencias`;
  }

 /**
  * Verificar a autoria da ocorrência com base nos dados das pessoas
  * Se Autor ou Autor/Vitima, etc e não tiver RG será autoria desconhecida
  * @param pessoas
  */
  public static autoriaOcorrenciaDesconhecida(pessoas: any[] = []): boolean {
    const autores = ['Autor', 'Autor/Vítima',
                    'Indiciado', 'Adolescente infrator',
                    'Adolescente Inf/Vit', 'Investigado', 'Adolescente'];

    if (!_.isEmpty(pessoas)) {
      pessoas.forEach((pessoaOcorrencia: PessoaOcorrencia) => {
        // Se tipo pessoa do BO esta contido no array de autores
        const condicao1: any = _.some(autores, (el) => _.includes(_.trim(pessoaOcorrencia.tipo), el));
        // Se a poessoa possuir RG
        const condicao2: any =
        _.trim(pessoaOcorrencia.rg) === undefined ||
        _.trim(pessoaOcorrencia.rg) === null ||
        _.trim(pessoaOcorrencia.rg) === '';
        // Se tiver pelo menos uma pessoa com as condicoes habilitar suspeitos
        if (condicao1 && condicao2) {
          return condicao1 && condicao2;
        }
      });
    }
    return false;
  }

}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeParams(fromParams: any = {}): any {
  return {
    numeroBo: fromParams.numero,
    anoBo: fromParams.ano,
    idDelegacia: fromParams.idDelegacia,
    nome: fromParams.nomeDelegacia,
    idDelegaciaBo: fromParams.idDelegacia,
    placa: fromParams.placa,
    historico: fromParams.historico,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePage(fromPage: any = new Page()): Page<Ocorrencia> {
  const page = new Page<Ocorrencia>();
  page.count = fromPage.count;

  fromPage.data.forEach((model: any) => {
    page.data.push({
      id: model.id,
      numero: model.numero_bo,
      ano: model.ano_bo,
      delegacia: normalizeDelegacia(model),
      naturezas: normalizeNaturezas(model.naturezas),
      dataElaboracao: model.data_hora_registro,
      local: normalizeEndereco(model),
      historico: model.historico,
    } as Ocorrencia);
  });

  return page;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeOcorrencia(model: any): Ocorrencia {
  return {
    id: model.id,
    numero: model.numero_bo,
    ano: model.ano_bo,
    delegacia: normalizeDelegacia(model),
    naturezas: normalizeNaturezas(model.naturezas),
    data: model.data_ocorrencia,
    dataComunicacao: model.data_comunicacao,
    dataElaboracao: model.data_hora_registro,
    tipoLocal: model.tipo_local,
    subTipoLocal: model.sub_tipo_local,
    local: normalizeEndereco(model),
    historico: model.historico,
    latitude: model.latitude,
    longitude: model.longitude,
    circunscricao: model.circuscricao,
    escrivao: normalizeEscrivao(model),
    delegado: normalizeDelegado(model),
    autoriaConhecida: model.autoria && model.autoria !== 'desconhecida',
  } as Ocorrencia;
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
function normalizeEndereco(model: any = {}): Endereco {
  return {
    logradouro: model.logradouro,
    numero: model.numero_logradouro,
    complemento: model.complemento_logradouro,
    bairro: model.bairro,
    municipio: model.municipio,
    uf: model.uf,
    cep: model.cep,
  } as Endereco;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizePessoas(models: any[] = []): PessoaOcorrencia[] {
  if (!models) {
    return models;
  }

  const pessoas: PessoaOcorrencia[] = [];
  models.forEach((model) => {
    pessoas.push({
      id: model.idPessoaCivil || model.idPessoaCriminal,
      nome: model.nome,
      rg: model.rg,
      cpf: model.cpf,
      tipo: model.tipo_pessoa,
      situacao: model.situacao,
    } as PessoaOcorrencia);
  });

  return pessoas;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeVeiculos(models: any[] = []): Veiculo[] {
  if (!models) {
    return models;
  }

  const mountId = (placa: string, chassi: string) => {
    if (placa && chassi) {
      return `${placa}_${chassi}_veiculo`;
    }

    return null;
  };

  const veiculos: Veiculo[] = [];
  models.forEach((model) => {
    veiculos.push({
      id: mountId(model.placa, model.chassi),
      placa: model.placa,
      chassi: model.chassi,
      marca: model.marca,
      cor: model.cor,
      anoFabricacao: model.ano_fabricacao,
      anoModelo: model.ano_modelo,
      tipo: model.tipo_veiculo,
      municipio: model.municipio,
      envolvimento: model.envolvimento || model.envolvimento_veiculo,
      natureza: model.natureza,
    } as Veiculo);
  });

  return veiculos;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeVeiculosByPessoa(models: any[] = []): VeiculoOcorrencia[] {
  if (!models) {
    return models;
  }

  const veiculos: VeiculoOcorrencia[] = [];
  models.forEach((model) => {
    veiculos.push({
      id: model.id_ocorrencia,
      numero: model.numero_bo,
      ano: model.ano_bo,
      delegacia: normalizeDelegacia(model),
      naturezas: normalizeNaturezas(model.naturezas),
      dataElaboracao: model.data_hora_registro,
      envolvimento: model.envolvimento_veiculo,
    } as VeiculoOcorrencia);
  });

  return veiculos;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeDelegado(model: any = {}): Delegado {
  return {
    nome: model.nome_delegado,
  } as Delegado;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeEscrivao(model: any = {}): Escrivao {
  return {
    nome: model.nome_digitador,
  } as Escrivao;
}
