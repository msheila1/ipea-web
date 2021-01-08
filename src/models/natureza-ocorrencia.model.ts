import { AbstractModel } from './abstract.model';

export class NaturezaOcorrencia extends AbstractModel<string> {
  public legislacao!: string;
  public artigo!: string;
  public rubrica!: string;
}
