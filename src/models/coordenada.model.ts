import { AbstractModel } from './abstract.model';

export class Coordenada extends AbstractModel<string> {
  public icone!: string;
  public titulo!: string;
  public conteudo!: string;
  public latitude!: number;
  public longitude!: number;
  public central!: boolean;
}
