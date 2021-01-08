import { AbstractModel } from './abstract.model';
import { ProprietarioVeiculo } from './proprietario-veiculo.model';

export class Veiculo extends AbstractModel<string> {
  public placa!: string;
  public chassi!: string;
  public marca!: string;
  public cor!: string;
  public anoFabricacao!: number;
  public anoModelo!: number;
  public tipo!: string;
  public municipio!: string;
  public uf!: string;
  public natureza!: string;
  public envolvimento!: string;
  public confidencial!: boolean;
  public proprietarioAtual!: ProprietarioVeiculo;
  public proprietarioAnterior!: ProprietarioVeiculo;
}
