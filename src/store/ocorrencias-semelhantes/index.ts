import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import _ from 'lodash';

import {
  Coordenada,
  FiltroOcorrenciaSemelhante,
  FiltroSuspeito,
  OcorrenciaSemelhante,
  Page,
  Pageable,
  ResultList,
} from '@/models';
import { WatsonService, OcorrenciasService } from '@/services';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  PAGE_SUCCESS = 'page_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FiltroOcorrenciaSemelhante;
  page: Page<OcorrenciaSemelhante>;
  pageCopy: Page<OcorrenciaSemelhante>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroOcorrenciaSemelhante(),
  page: new Page<OcorrenciaSemelhante>(),
  pageCopy: new Page<OcorrenciaSemelhante>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  coordenadas: (state) => {
    const coordenadas: Coordenada[] = [];
    state.page.data.forEach((ocorrencia: OcorrenciaSemelhante) => {
      if (ocorrencia.latitude && ocorrencia.longitude) {
        coordenadas.push(OcorrenciasService.createCoordenada(ocorrencia, false));
      } else {
        // tslint:disable:no-console
        console.warn(`B.O. nº ${ocorrencia.numero}/${ocorrencia.ano} não possui coordenadas (Lat e Lon) geográfica.`);
      }
    });

    if (state.filter.referencia && state.filter.referencia.latitude && state.filter.referencia.longitude) {
      coordenadas.push(OcorrenciasService.createCoordenada(state.filter.referencia, true));
    }

    return coordenadas;
  },
  resultList: (state) => new ResultList<OcorrenciaSemelhante>(state.pageCopy, state.pageable, state.error),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.QUERY](state: State, { filter, pageable }) {
    state.loading = true;
    state.page = new Page<OcorrenciaSemelhante>();
    state.filter = { ...filter };
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page, coordenadas }) {
    state.loading = false;
    state.page = { ...page };
    state.error = undefined;
  },
  [Types.PAGE_SUCCESS](state: State, { pageable }) {
    state.loading = false;
    state.pageable = { ...pageable };
    // tslint:disable-next-line:max-line-length
    state.pageCopy = Page.newInstance<OcorrenciaSemelhante>(state.page.data, state.pageable.pageNumber, state.pageable.pageSize);
    state.error = undefined;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<OcorrenciaSemelhante>();
    state.pageCopy = new Page<OcorrenciaSemelhante>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroOcorrenciaSemelhante();
    state.page = new Page<OcorrenciaSemelhante>();
    state.pageCopy = new Page<OcorrenciaSemelhante>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { filter, pageable }) {
    try {
      store.commit(Types.QUERY, { filter, pageable });

      store.dispatch('ocorrencias-suspeitos/clear', { }, { root: true });

      const page = await WatsonService.query(filter, new Pageable(1, 30)).toPromise();
      if (page.isNotEmpty()) {
        store.commit(Types.QUERY_SUCCESS, { page });
        store.commit(Types.PAGE_SUCCESS, { pageable });

        store.dispatch('ocorrencias-suspeitos/query', {
          filter: new FiltroSuspeito(page.data), pageable,
        }, { root: true });

      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  /**
   * Paginação em memória no client, porque não temos paginação no servidor do watson. \o/
   */
  async queryPageChange(store: ActionContext<State, any>, { pageable }) {
    store.commit(Types.PAGE_SUCCESS, { pageable });
  },

  async clear(store: ActionContext<State, any>): Promise<void> {
    store.commit(Types.CLEAR);
  },
} as ActionTree<State, any>;

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
