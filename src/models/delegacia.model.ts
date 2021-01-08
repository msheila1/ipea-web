import { AbstractModel } from './abstract.model';

export class Delegacia extends AbstractModel<number> {
  public codigo!: number;
  public nome!: string;
  public nomeFantasia!: string;
  public idDelegacia!: number; // TODO Remover após adaptação da funcionalidade veículos
}
