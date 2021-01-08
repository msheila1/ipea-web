import { AbstractModel } from './abstract.model';

export class ElasticsearchConfig extends AbstractModel<string> {
  public index!: string;
  public config!: string;
  public count!: number;
  public readOnlyAllowDelete!: string;
  public readOnly!: string;
  public refreshInterval!: string;
}
