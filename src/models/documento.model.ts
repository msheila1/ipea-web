export class Documento {
  public nome!: string;
  public conteudo!: Blob;
  public error!: string;

  constructor(nome: string, conteudo: Blob) {
    this.nome = nome;
    this.conteudo = conteudo;
  }
}
