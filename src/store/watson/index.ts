import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { FiltroOcorrenciaSemelhante, OcorrenciaSemelhante, Page, Pageable, ResultList } from '@/models';
import { WatsonService } from '@/services';
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
  filter: FiltroOcorrenciaSemelhante;
  page: Page<OcorrenciaSemelhante>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroOcorrenciaSemelhante(),
  page: new Page<OcorrenciaSemelhante>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  resultList: (state) => new ResultList<OcorrenciaSemelhante>(state.page, state.pageable, state.error),
  loading: (state) => state.loading,
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
    state.page = new Page<OcorrenciaSemelhante>();
    state.pageable = new Pageable();
    state.error = undefined;

    Notification.info({
      title: 'Informativo',
      message: 'Nenhum registro encontrado.',
    });
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroOcorrenciaSemelhante();
    state.page = new Page<OcorrenciaSemelhante>();
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

      store.dispatch('watson/clear', { }, { root: true });

      const page = await WatsonService.query(filter, pageable).toPromise();
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
