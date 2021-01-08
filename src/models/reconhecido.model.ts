import { AbstractModel } from './abstract.model';
import { Foto } from './foto.model';
import { Suspeito } from './suspeito.model';

export class Reconhecido extends AbstractModel<string> {
  public suspeito!: Suspeito;
  public foto!: Foto;
}
