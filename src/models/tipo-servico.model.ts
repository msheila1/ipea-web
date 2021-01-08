import { AbstractModel } from './abstract.model';

export class TipoServico extends AbstractModel<number> {
  public codigo!: number;
  public descricao!: string;
  public external!: boolean;
  public cacheable!: boolean;
}
