export class FiltroLocalVeiculo {
  public veiculoId!: string;
  public dataInicial: Date | undefined;
  public dataFinal: Date | undefined;

  public get periodo(): Date[] {
    return this.dataInicial && this.dataFinal ? [ this.dataInicial, this.dataFinal ] : [];
  }

  public set periodo(periodo: Date[]) {
    if (periodo && periodo.length === 2) {
      this.dataInicial = periodo[0];
      this.dataFinal = periodo[1];

    } else {
      this.dataInicial = undefined;
      this.dataFinal = undefined;
    }
  }
}
