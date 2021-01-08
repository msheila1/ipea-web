import { AbstractModel } from './abstract.model';
import { Delegado } from './delegado.model';
import { Endereco } from '@/models/endereco.model';
import { Escrivao } from './escrivao.model';
import { NaturezaOcorrencia } from '@/models/natureza-ocorrencia.model';
import { Delegacia } from '@/models/delegacia.model';

/* tslint:disable */
export class Ocorrencia extends AbstractModel<string> {
  public ano!: number;
  public numero!: number;
  public delegacia!: Delegacia;
  public naturezas!: NaturezaOcorrencia[];
  public dataElaboracao!: Date;
  public dataComunicacao!: Date;
  public data!: Date;
  public periodo!: string;
  public historico!: string;
  public confidencial!: boolean;

  public flagrante!: boolean;
  public local!: Endereco;
  public tipoLocal!: string;
  public subTipoLocal!: string;
  public circunscricao!: string;
  public latitude!: number;
  public longitude!: number;
  public autoriaConhecida!: boolean;
  public envolvimento!: string;

  public data_hora_registro!: Date;
  public nome_delegacia!: string;
  public data_ocorrencia!: Date;
  public data_comunicacao!: Date;
  public tipo_local!: string;
  public sub_tipo_local!: string;
  public envolvimento_veiculo!: string;
  public logradouro!: string;
  public numero_logradouro!: string;
  public complemento_logradouro!: string;
  public bairro!: string;
  public municipio!: string;
  public uf!: string;
  public cep!: string;

  public delegado!: Delegado;
  public escrivao!: Escrivao;
  
  /* tslint:disable:public-static-method */
  // TODO Remover após alterar os demais pontos que utilizam este método
  public static normalizeEnderecoFato(ocorrencia: Ocorrencia): Endereco {
    const endereco = new Endereco();
    endereco.logradouro = ocorrencia.logradouro;
    endereco.numero = ocorrencia.numero_logradouro;
    endereco.complemento = ocorrencia.complemento_logradouro;
    endereco.bairro = ocorrencia.bairro;
    endereco.municipio = ocorrencia.municipio;
    endereco.uf = ocorrencia.uf;
    endereco.cep = ocorrencia.cep;

    return endereco;
  }
}
