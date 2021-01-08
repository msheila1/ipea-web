import { Ocorrencia } from './ocorrencia.model';

export class FiltroSuspeito {
  public ocorrencias!: Ocorrencia[];

  constructor(ocorrencias: Ocorrencia[] = []) {
    this.ocorrencias = ocorrencias;
  }
}
