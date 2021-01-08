import { AbstractModel } from './abstract.model';

export class OutroNome extends AbstractModel<string> {
  public tipo!: string;
  public nome!: string;
  public confidencial!: boolean;
}
