import { FiltroPessoa } from './filtro-pessoa.model';

export class FiltroUpload extends FiltroPessoa {
  public allowImagePreview!: boolean;
  public allowMultiple: boolean = true;
  public instantUpload!: boolean;
  public maxFiles: number = 100;
}
