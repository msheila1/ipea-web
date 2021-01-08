import { AbstractModel } from './abstract.model';
import { EnderecoReceiraFederal } from './endereco-receita-federal.model';

export class ReceitaFederal extends AbstractModel<string> {

  public ascendente1!: string;
  public ascendente3!: string;
  public ascendente2!: string;
  public ascendente4!: string;
  public celular!: string;
  public codigoNacionalidade!: number;
  public codigoNaturalidade!: number;
  public cpf!: string;
  public dataNascimento!: Date;
  public ddd!: string;
  public nacionalidade!: string;
  public naturalidade!: string;
  public nome!: string;
  public sexo!: string;
  public situacaoCadastral!: string;
  public telefoneFixo!: string;
  public ufNaturalidade!: string;
  public endereco: EnderecoReceiraFederal = new EnderecoReceiraFederal();

}
