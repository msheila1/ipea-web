import { AbstractModel } from './abstract.model';

export class FonteDados extends AbstractModel<string> {
  public nome!: string;
  public totalConfidencial!: number;
  public total!: number;
  public dataUltimaInclusao!: Date;
  public dataConsolidacao!: Date;
  public situacaoConsolidacao!: string;
}
