import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { FiltroPessoaOcorrencia, Page, Pageable, Pessoa, ResultList } from '@/models';
import { PessoasService } from '@/services';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FiltroPessoaOcorrencia;
  model: Pessoa;
  page: Page<Pessoa>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroPessoaOcorrencia(),
  model: new Pessoa(),
  page: new Page<Pessoa>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  filter: (state) => state.filter,
  loading: (state) => state.loading,
  model: (state) => state.model,
  resultList: (state) => new ResultList<Pessoa>(state.page, state.pageable, state.error),
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
    state.page = new Page<Pessoa>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroPessoaOcorrencia();
    state.page = new Page<Pessoa>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { pessoaId, filter, pageable }) {
    try {
      store.commit(Types.QUERY, { filter, pageable });
      filter.search = true;
      const page = await PessoasService.listOcorrencias(filter, pessoaId, pageable).toPromise();
      if (page.isNotEmpty()) {
        store.commit(Types.QUERY_SUCCESS, { page });
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < page.data.length; i++) {
          store.dispatch('pessoas/findFoto', { pessoa: page.data[i], page }, { root: true });
        }
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
