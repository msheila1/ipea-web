import { Ocorrencia } from './ocorrencia.model';

export class FiltroOcorrenciaSemelhante {
  public referencia!: Ocorrencia;
  public endpoint!: string;
  public raioDistancia!: number;
  public similaridadeAceitavel!: number;
  public modusOperandiAutor!: boolean;
  public modusOperandiVitima!: boolean;
}
