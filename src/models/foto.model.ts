import { AbstractModel } from './abstract.model';

export class Foto extends AbstractModel<string> {
  public origem!: string;
  public codigoOrigem!: string;
  public base64!: string;
  public descricao!: string;
  public selecionada!: boolean;
  public error?: Error;

  public cpf!: string;
  public rg!: string;
  public expira!: number;
  public expiraEnum!: string;

}
