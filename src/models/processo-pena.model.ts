import { AbstractModel } from './abstract.model';

export class ProcessoPena extends AbstractModel<string> {
  public ano!: number;
  public dia!: number;
  public mes!: number;
  public tipo!: string;
  public confidencial!: boolean;
}
