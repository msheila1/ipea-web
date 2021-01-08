export class FiltroPessoaVeiculo {
  public exact!: boolean;
  public sort!: string;
  public cpfCnpjProprietario!: string;

  constructor() {
    this.exact = true;
    this.sort = 'placa.keyword,asc';
  }

}
