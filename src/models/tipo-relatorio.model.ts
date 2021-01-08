import { AbstractModel } from './abstract.model';

export class TipoRelatorio extends AbstractModel<number> {
  public codigo!: number;
  public descricao!: string;
}
