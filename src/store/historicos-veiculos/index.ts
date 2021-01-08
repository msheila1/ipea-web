import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { HistoricoVeiculo, Page, Pageable, ResultList } from '@/models';
import { VeiculosService } from '@/services';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  veiculoId?: number;
  page: Page<HistoricoVeiculo>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  veiculoId: undefined,
  page: new Page<HistoricoVeiculo>(),
  pageable: new Pageable(1, 5),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  resultList: (state) => new ResultList<HistoricoVeiculo>(state.page, state.pageable, state.error),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.QUERY](state: State, { veiculoId, pageable }) {
    state.loading = true;
    state.veiculoId = veiculoId;
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<HistoricoVeiculo>();
    state.pageable = new Pageable();
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.veiculoId = undefined;
    state.page = new Page<HistoricoVeiculo>();
    state.pageable = new Pageable();
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { veiculoId, pageable }) {
    try {
      store.commit(Types.QUERY, { veiculoId, pageable });
      const page = await VeiculosService.queryHistorico(veiculoId, pageable).toPromise();
      if (page.isNotEmpty()) {
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
