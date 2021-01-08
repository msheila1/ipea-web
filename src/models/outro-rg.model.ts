import { AbstractModel } from './abstract.model';

export class OutroRg extends AbstractModel<string> {
  public numero!: string;
  public origem!: string;
  public confidencial!: boolean;
}
