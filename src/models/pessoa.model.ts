import { AbstractPessoa } from './abstract-pessoa.model';
import { CaracteristicaFisica } from './caracteristica-fisica.model';
import { Endereco } from './endereco.model';
import { Foto } from './foto.model';

export class Pessoa extends AbstractPessoa<string> {
  public cpfs!: string[];
  public rgs!: string[];
  public naturalidade!: string;
  public naturalizado!: string;
  public estadoCivil!: string;
  public grauInstrucao!: string;
  public profissao!: string;
  public codigoSituacao!: number;
  public situacao!: string;
  public origem!: string;
  public caracteristicaFisica!: CaracteristicaFisica;
  public enderecoResidencial!: Endereco;
  public enderecoComercial!: Endereco;
  public confidencial!: boolean;
  public loading!: boolean;

  // TODO Avaliar se os campos abaixo realmente são utilizados
  public foto = new Foto();
  public fotos: Foto[] = [];
  public codigoTipoPessoa!: number;
  public tipo!: string;
}
