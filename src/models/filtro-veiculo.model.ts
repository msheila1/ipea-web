export class FiltroVeiculo {
  public idDetran!: string;
  public placa!: string;
  public chassi!: string;
  public marca!: string;
  public cores!: string[];
  public tipos!: string[];
  public descricaoIbge!: string;
  public sort!: string;

  constructor() {
    this.cores = [];
    this.tipos = [];
    this.sort = 'placa.keyword,asc';
  }
}
