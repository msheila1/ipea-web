import { Delegacia } from '@/models/delegacia.model';
import { NaturezaOcorrencia } from '@/models/natureza-ocorrencia.model';
import { Veiculo } from './veiculo.model';

export class VeiculoOcorrencia extends Veiculo {
  public ano!: number;
  public numero!: number;
  public delegacia!: Delegacia;
  public naturezas!: NaturezaOcorrencia[];
  public dataElaboracao!: Date;
  public envolvimento!: string;
}
