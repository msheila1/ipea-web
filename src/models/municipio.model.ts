import { AbstractModel } from './abstract.model';

// tslint:disable:variable-name
export class Municipio extends AbstractModel<string> {
  public id_detran!: string; // TODO Mapear para codigo
  public nomeAndUf!: string; // TODO Mapear para nomeAndUf
  public idUf!: string; // TODO Mapear para idUf
}
