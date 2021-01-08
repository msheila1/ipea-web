import { AbstractModel } from './abstract.model';
import { Endereco } from './endereco.model';

export class ProprietarioVeiculo extends AbstractModel<string> {
  public idPessoa!: string;
  public nome!: string;
  public rg!: string;
  public rgUf!: string;
  public rgOrgao!: string;
  public codigoTipoDocumento!: number;
  public tipoDocumento!: string;
  public numeroDocumento!: string;
  public telefone!: string;
  public endereco!: Endereco;
  public confidencial!: boolean;
}
