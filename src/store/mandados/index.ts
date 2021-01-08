import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { Mandado, Page, Pageable, ResultList } from '@/models';
import { MandadosService } from '@/services';
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
  pessoaId?: string;
  page: Page<Mandado>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  pessoaId: undefined,
  page: new Page<Mandado>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  resultList: (state) => new ResultList<Mandado>(state.page, state.pageable, state.error),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.QUERY](state: State, { pessoaId, pageable }) {
    state.loading = true;
    state.pessoaId = pessoaId;
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<Mandado>();
    state.pageable = new Pageable();
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.pessoaId = undefined;
    state.page = new Page<Mandado>();
    state.pageable = new Pageable();
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { pessoaId, pageable }) {
    try {
      store.commit(Types.QUERY, { pessoaId, pageable });

      const page = await MandadosService.query(pessoaId, pageable).toPromise();
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

  async listMandados(store: ActionContext<State, any>, { pessoaId, filter, pageable }) {
    try {
      store.commit(Types.QUERY, { pessoaId, pageable });
      const page = await MandadosService.listMandados(pessoaId, filter, pageable).toPromise();
      if (page.isNotEmpty()) {
        store.commit(Types.QUERY_SUCCESS, { page });
      } else {
        store.commit(Types.NO_RESULT, false);
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
