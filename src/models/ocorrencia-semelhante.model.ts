import { Ocorrencia } from './ocorrencia.model';

export class OcorrenciaSemelhante extends Ocorrencia {
  public distancia!: number;
  public similaridade!: number;
  public tipoSimilaridade!: string;
}
