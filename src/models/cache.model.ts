import { AbstractModel } from './abstract.model';

export class Cache extends AbstractModel<string> {
  public tipoServico!: string;
  public tempoExpiracao!: string;
  public conteudo!: any;
  public rg!: string;
  public cpf!: string;
}
