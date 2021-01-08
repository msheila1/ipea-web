import { AbstractModel } from './abstract.model';
import { IncidenciaPenal } from './incidencia-penal.model';
import { ProcessoPena } from './processo-pena.model';

export class Processo extends AbstractModel<string> {
  public numero!: number;
  public ano!: number;
  public autoridadeJudiciaria!: string;
  public tipo!: string;
  public situacao!: string;
  public dataDecisao!: Date;
  public numeroInquerito!: number;
  public anoInquerito!: number;
  public confidencial!: boolean;
  public incidencias: IncidenciaPenal[] = [];
  public penas: ProcessoPena[] = [];
}
