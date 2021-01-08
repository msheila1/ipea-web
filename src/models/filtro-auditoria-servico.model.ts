import { MomentHelper } from '@/helpers';

export class FiltroAuditoriaServico {
  public dataInicial!: Date | undefined;
  public dataFinal!: Date | undefined;
  public tiposRespostas!: string[];
  public tiposServicos!: string[];

  constructor() {
    this.tiposRespostas = [];
    this.tiposServicos = [];
    this.periodo = [MomentHelper.currentDateTime(), MomentHelper.currentDateTime()];
  }

  public get periodo(): Date[] {
    return this.dataInicial && this.dataFinal ? [ this.dataInicial, this.dataFinal ] : [];
  }

  public set periodo(periodo: Date[]) {
    if (periodo && periodo.length === 2) {
      this.dataInicial = periodo[0]; // moment(periodo[0]).format(moment.HTML5_FMT.DATETIME_LOCAL_MS);
      this.dataFinal = periodo[1]; // moment(periodo[1]).format(moment.HTML5_FMT.DATETIME_LOCAL_MS);

    } else {
      this.dataInicial = undefined;
      this.dataFinal = undefined;
    }
  }
}