import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Delegacia, FiltroOcorrenciaSemelhante, OcorrenciaSemelhante, Pageable, Page, Ocorrencia } from '@/models';
import { AbstractService, findBy } from '@/services';

export class WatsonService {

  public static query(filter: FiltroOcorrenciaSemelhante, pageable: Pageable): Observable<Page<OcorrenciaSemelhante>> {
    return findBy(factoryEndpoint(filter), normalizeParams(filter)).pipe(
      map((data: any) => normalizeOcorrenciasSemelhantes(data, filter.referencia)),
    );
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/watson`;
  }
}

function factoryEndpoint(filter: FiltroOcorrenciaSemelhante): string {
  let endpoint = '';

  if (filter.endpoint === 'HS') {
    endpoint = `${AbstractService.baseUrl}/watson/similarHS`; // TODO Serviço indisponível

  } else if (filter.endpoint === 'DEL') {
    endpoint = `${AbstractService.baseUrl}/watson/similarDel`; // TODO Serviço indisponível

  } else if (filter.endpoint === 'GROUP') {
    endpoint = `${AbstractService.baseUrl}/watson/similarGroup`; // TODO Serviço indisponível

  } else if (filter.endpoint === 'MO Ref') {
    endpoint = `${AbstractService.baseUrl}/watson/similarMORefCampo`; // TODO Serviço indisponível

  } else if (filter.endpoint === 'Collection') {
    endpoint = `${AbstractService.baseUrl}/watson/similarToCollection`; // TODO Serviço indisponível

  } else {
    endpoint = `${AbstractService.baseUrl}/watson/similarMO`;
  }

  return endpoint;
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeParams(fromParams: any = {}): any {
  // tslint:disable:max-line-length
  return {
    numero: fromParams.numero || fromParams.referencia.numero,
    ano: fromParams.ano || fromParams.referencia.ano,
    idDelegacia: fromParams.idDelegacia || (fromParams.referencia.delegacia && fromParams.referencia.delegacia.id),
    nomeDelegacia: fromParams.nomeDelegacia || (fromParams.referencia.delegacia && fromParams.referencia.delegacia.nome),
    raioKm: fromParams.raio || fromParams.raioDistancia || 1500,
    percentSimilaridadeAceitavel: fromParams.similaridadeAceitavel || '0',
    similarMoA: fromParams.modusOperandiAutor || 'false',
    similarMoV: fromParams.modusOperandiVitima || 'false',
    endpoint: fromParams.endpoint,
    counted: false,
  };
}

// TODO Normalização até padronizar nomenclatura nos microsserviços
function normalizeOcorrenciasSemelhantes(data: any, referencia: Ocorrencia): Page<OcorrenciaSemelhante> {
  if (!data) {
    return new Page<OcorrenciaSemelhante>();
  }

  const page = new Page<OcorrenciaSemelhante>();
  page.count = data.bos.length;

  const ocorrenciaOrigem = referencia || { latitude: data.latitude, longitude: data.longitude };
  let ocorrenciaDestino = null;

  data.bos.forEach((model: any) => {
    ocorrenciaDestino = {
      id: mountId(model),
      numero: model.numBo,
      ano: model.anoBo,
      delegacia: normalizeDelegacia(model),
      latitude: invertSinal(model.latitude),
      longitude: invertSinal(model.longitude),
      similaridade: model.percSimilaridade,
      tipoSimilaridade: model.typeScore,
      distancia: model.distancia,
      historico: model.historico,
      autoriaConhecida: 'S' === model.autoriaOcorrencia,
    } as OcorrenciaSemelhante;

    ocorrenciaDestino.distancia = calculateDistance(ocorrenciaOrigem, ocorrenciaDestino);

    page.data.push(ocorrenciaDestino);
  });

  return page;
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

function mountId(model: any) {
  if (model.idDelegacia && model.anoBo && model.numBo) {
    return `${model.idDelegacia}_${model.anoBo}_${model.numBo}_ocorrencias_ocorrencia`;
  }

  return null;
}

// BOs do Watson estao com latitude e longitude positivas, converter todas para negativo
function invertSinal(value: number): number {
  return value ? value * -1 : value;
}

// TODO Esse método deveria estar no backend.
function calculateDistance(origin: Ocorrencia, destination: OcorrenciaSemelhante): number {
  if (!origin || !destination) {
    return 0;
  }

  const R = 6371; /* raio da terra em KM */
  const dLat = (destination.latitude - origin.latitude) * (Math.PI / 180);
  const dLon = (destination.longitude - origin.longitude) * (Math.PI / 180);

  // tslint:disable-next-line:max-line-length
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(origin.latitude * (Math.PI / 180)) * Math.cos(destination.latitude * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = (R * c) * 1000; /* Distance in metros */

  return Math.round(distancia);
}
