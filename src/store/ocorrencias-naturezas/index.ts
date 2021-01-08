import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { NaturezaOcorrencia, Page, Pageable, ResultList } from '@/models';
import { OcorrenciasService } from '@/services';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  ocorrenciaId?: number;
  page: Page<NaturezaOcorrencia>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  ocorrenciaId: undefined,
  page: new Page<NaturezaOcorrencia>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  resultList: (state) => new ResultList<NaturezaOcorrencia>(state.page, state.pageable, state.error),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.QUERY](state: State, { ocorrenciaId, pageable }) {
    state.loading = true;
    state.ocorrenciaId = ocorrenciaId;
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<NaturezaOcorrencia>();
    state.pageable = new Pageable();
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.ocorrenciaId = undefined;
    state.page = new Page<NaturezaOcorrencia>();
    state.pageable = new Pageable();
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { ocorrenciaId, pageable }) {
    try {
      store.commit(Types.QUERY, { ocorrenciaId, pageable });

      const page = await OcorrenciasService.queryNatureza(ocorrenciaId, pageable).toPromise();
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
