import { AbstractModel } from './abstract.model';

export class CaracteristicaFisica extends AbstractModel<string> {
  public cabelo!: string;
  public olhos!: string;
  public pele!: string;
}
