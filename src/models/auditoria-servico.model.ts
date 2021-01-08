import { AbstractModel } from './abstract.model';
import { TipoResposta } from './tipo-resposta.model';
import { TipoServico } from './tipo-servico.model';

export class AuditoriaServico extends AbstractModel<string> {
  public tipoServico!: TipoServico;
  public usuarioSolicitante!: string;
  public dataRequisicao!: Date;
  public conteudoRequisicao!: string;
  public dataResposta!: Date;
  public conteudoResposta!: string;
  public tipoResposta!: TipoResposta;
}
