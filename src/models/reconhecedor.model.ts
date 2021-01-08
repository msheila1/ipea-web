import { AbstractModel } from './abstract.model';

export class Reconhecedor extends AbstractModel<string> {
  public rg!: string;
  public cpf!: string;
  public nome!: string;
  public nomeMae!: string;
  public nomePai!: string;
  public dataNascimento!: Date;
  public codigoTipoPessoa!: string;
  public tipoPessoa!: string;
}
