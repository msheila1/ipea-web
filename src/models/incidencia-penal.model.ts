import { AbstractModel } from './abstract.model';

export class IncidenciaPenal extends AbstractModel<string> {
  public artigo!: string;
  public paragrafo!: string;
  public inciso!: string;
  public legislacao!: string;
}
