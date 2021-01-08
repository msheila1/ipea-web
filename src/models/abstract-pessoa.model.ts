import { AbstractModel } from './abstract.model';

export abstract class AbstractPessoa<ID> extends AbstractModel<ID> {

  public cpf!: string;
  public rg!: string;
  public rgDc!: string;
  public rgSequencia!: string;
  public nome!: string;
  public nomeMae!: string;
  public nomePai!: string;
  public dataNascimento!: Date;
  public sexo!: string;

}
