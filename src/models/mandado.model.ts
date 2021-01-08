import { AbstractModel } from './abstract.model';
import { IncidenciaPenal } from '@/models/incidencia-penal.model';
import { ProcessoPena } from './processo-pena.model';

export class Mandado extends AbstractModel<string> {
  public numeroProcesso!: number;
  public anoProcesso!: number;
  public autoridadeJudiciaria!: string;
  public classificacao!: string;
  public situacao!: string;
  public dataExpedicao!: Date;
  public confidencial!: boolean;
  public penaAno!: number;
  public penaDia!: number;
  public penaMes!: number;
  public tipoPena!: string;
  public incidenciaPenal!: IncidenciaPenal;
  public pena!: ProcessoPena;
}
