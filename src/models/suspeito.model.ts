import { AbstractModel } from './abstract.model';
import { Foto } from './foto.model';
import { Ocorrencia } from './ocorrencia.model';

export class Suspeito extends AbstractModel<string> {
  public nome!: string;
  public idPessoa!: string;
  public rg!: string;
  public cpf!: string;
  public tipo!: string;
  public situacao!: string;
  public ocorrencia!: Ocorrencia;
  public fotos?: Foto[];
  public reconhecido!: boolean;
  public loading!: boolean;
  public done!: boolean;
}
