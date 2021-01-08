import { AbstractModel } from './abstract.model';

export class Alcunha extends AbstractModel<string> {
  public rg!: string;
  public alcunha!: string;
  public confidencial!: boolean;
}
