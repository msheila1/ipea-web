import { AbstractPessoa } from './abstract-pessoa.model';
import { CaracteristicaFisica } from './caracteristica-fisica.model';
import { Endereco } from './endereco.model';
import { Foto } from './foto.model';

export class Criminal extends AbstractPessoa<string> {
  public naturalidade!: string;
  public naturalizado!: string;
  public estadoCivil!: string;
  public grauInstrucao!: string;
  public profissao!: string;
  public codigoSituacao!: number;
  public situacao!: string;
  public origem!: string;
  public postoIdentificacao!: string;
  public dataIdentificacao!: Date;
  public caracteristicaFisica!: CaracteristicaFisica;
  public enderecoResidencial!: Endereco;
  public enderecoComercial!: Endereco;
  public confidencial!: boolean;

}
