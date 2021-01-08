import { AbstractModel } from './abstract.model';

export class TipoResposta extends AbstractModel<number> {
  public codigo!: number;
  public descricao!: string;
}
