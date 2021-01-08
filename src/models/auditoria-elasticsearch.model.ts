import { AbstractModel } from './abstract.model';

export class AuditoriaElasticsearch extends AbstractModel<string> {
  public nomeIndice!: string;
  public tipoDocumento!: string;
  public quantidadeDocumentos!: number;
  public ultimaInclusao!: Date;
}
