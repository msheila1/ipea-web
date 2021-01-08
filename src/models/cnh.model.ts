import { AbstractModel } from './abstract.model';
import { Endereco } from './endereco.model';

export class Cnh extends AbstractModel<string> {
  public registro!: number;
  public dataEmissao!: Date;
  public dataValidade!: Date;
  public categoria!: string;
  public rgOrgao!: string;
  public dataNascimento!: Date;
  public endereco!: Endereco;
}
