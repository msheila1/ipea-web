import { AbstractModel } from './abstract.model';

export abstract class AbstractEndereco<ID> extends AbstractModel<ID> {

  public logradouro!: string;
  public numero!: string;
  public complemento!: string;
  public bairro!: string;
  public cep!: string;
  public municipio!: string;
  public uf!: string;

}
