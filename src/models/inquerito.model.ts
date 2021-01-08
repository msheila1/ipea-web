import { AbstractModel } from './abstract.model';
import { IncidenciaPenal } from './incidencia-penal.model';

export class Inquerito extends AbstractModel<string> {
  public numero!: number;
  public ano!: number;
  public delegacia!: string;
  public vitima!: string;
  public dataFato!: Date;
  public dataInstauracao!: Date;
  public incidencias: IncidenciaPenal[] = [];
  public confidencial!: boolean;
}
