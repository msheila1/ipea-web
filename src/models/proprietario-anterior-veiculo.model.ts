import { AbstractModel } from '@/models/abstract.model';
import { Endereco } from '@/models/endereco.model';

export class ProprietarioAnteriorVeiculo extends AbstractModel<string> {
  public proprietarioAnterior!: string;
  public rgProprietarioAnterior!: string;
  public rgUfProprietarioAnterior!: string;
  public rgOrgaoProprietarioAnterior!: string;
  public tipoDocumentoCpfCnpjProprietarioAnterior!: string;
  public cpfCnpjProprietarioAnterior!: string;
  public logradouroProprietarioAnterior!: string;
  public numeroProprietarioAnterior!: string;
  public complementoProprietarioAnterior!: string;
  public bairroProprietarioAnterior!: string;
  public cepProprietarioAnterior!: string;
  public codigoMunicipioProprietarioAnterior!: string;
  public municipioProprietarioAnterior!: string;
  public ufProprietarioAnterior!: string;
}
