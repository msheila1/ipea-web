import { AbstractModel } from './abstract.model';
import { TipoServico } from './tipo-servico.model';

export class AuditoriaAcesso extends AbstractModel<string> {
  public tipoServico!: TipoServico;
  public funcionalidade!: string;
  public rgUsuario!: string;
  public nomeUsuario!: string;
  public dataRequisicao!: Date;
  public conteudoRequisicao!: string;
  public dataResposta!: Date;
  public conteudoResposta!: string;
  public status!: string;
  public totalAcessos!: number;
}
