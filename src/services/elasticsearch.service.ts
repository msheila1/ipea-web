import { Observable } from 'rxjs';

import { AbstractService, listAll } from '@/services';

export class ElasticsearchService {

  public static listAllIndice(): Observable<string[]> {
    return listAll(`${this.endpoint}/indices`);
  }

  private static get endpoint(): string {
    return `${AbstractService.baseUrl}/elasticsearch`;
  }
}
