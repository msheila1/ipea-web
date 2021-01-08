import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { FiltroAuditoriaElasticsearch, Page, Pageable, ResultList, AuditoriaElasticsearch } from '@/models';
import { AuditoriaElasticsearchService } from '@/services';
import { Notification } from 'element-ui';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FiltroAuditoriaElasticsearch;
  page: Page<AuditoriaElasticsearch>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroAuditoriaElasticsearch(),
  page: new Page<AuditoriaElasticsearch>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  filter: (state) => state.filter,
  loading: (state) => state.loading,
  resultList: (state) => new ResultList<AuditoriaElasticsearch>(state.page, state.pageable, state.error),
};

export const mutations = {
  [Types.QUERY](state: State, { filter, pageable }) {
    state.loading = true;
    state.filter = { ...filter };
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
    state.error = undefined;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<AuditoriaElasticsearch>();
    state.pageable = new Pageable();
    state.error = undefined;

    Notification.info({
      title: 'Informativo',
      message: 'Nenhum registro encontrado.',
    });
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroAuditoriaElasticsearch();
    state.page = new Page<AuditoriaElasticsearch>();
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

      const page = await AuditoriaElasticsearchService.countTypes(filter, pageable).toPromise();
      if (page.isNotEmpty()) {
        page.data.sort((a, b) => new Date(b.ultimaInclusao).getTime() - new Date(a.ultimaInclusao).getTime());

        store.commit(Types.QUERY_SUCCESS, { page });

      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
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
