import { AbstractModel } from './abstract.model';

export class CorVeiculo extends AbstractModel<string> {
  public codigo!: string;
  public descricao!: string;
}
