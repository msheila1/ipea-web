import { AbstractModel } from './abstract.model';

export class LocalVeiculo extends AbstractModel<string> {
  public nomeLeitor!: string;
  public dataHoraEvento!: Date;
  public confidencial!: boolean;
}
