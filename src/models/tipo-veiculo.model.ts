import { AbstractModel } from './abstract.model';

export class TipoVeiculo extends AbstractModel<string> {
  public codigo!: string;
  public descricao!: string;
}
