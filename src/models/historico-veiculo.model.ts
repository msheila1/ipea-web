import { AbstractModel } from './abstract.model';
import { Endereco } from './endereco.model';

export class HistoricoVeiculo extends AbstractModel<string> {
  public rgProprietario!: string;
  public nomeProprietario!: string;
  public codigoTipoDocumento!: number;
  public tipoDocumento!: string;
  public numeroDocumento!: string;
  public municipioVeiculo!: string;
  public descricaoTransacao!: string;
  public dataInclusaoProprietarios!: Date;
  public endereco!: Endereco;
}
