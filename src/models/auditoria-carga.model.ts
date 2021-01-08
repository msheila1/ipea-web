import { AbstractModel } from './abstract.model';
import { FonteDados } from './fonte-dados.model';

export class AuditoriaCarga extends AbstractModel<string> {
  public origem!: FonteDados;
  public destino!: FonteDados;
}
