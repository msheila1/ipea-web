import { Documento } from '@/models';

export class DownloadsService {

  public static open(documento: Documento): void {
    const url = window.URL.createObjectURL(documento.conteudo);
    window.open(url, '_blank', '');
  }
}
