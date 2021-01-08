import { AbstractModel } from './abstract.model';
import { Delegado } from './delegado.model';
import { Escrivao } from './escrivao.model';
import { Ocorrencia } from './ocorrencia.model';
import { Reconhecedor } from './reconhecedor.model';

export class AutoReconhecimento extends AbstractModel<string> {
  public ocorrencia!: Ocorrencia;
  public reconhecedor!: Reconhecedor;
  public delegado!: Delegado;
  public escrivao!: Escrivao;
  public dataIdentificacao!: Date;
  public rubricas!: string;
  public reconhecidos!: any[];

  // Temporário
  public nomeDelegado!: string;
  public nomeEscrivao!: string;
  public nomeReconhecedor!: string;
}
