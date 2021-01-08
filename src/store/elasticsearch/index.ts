import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { ElasticsearchService } from '@/services';

export enum Types {
  LIST_ALL_INDICE = 'list_all_indice',
  LIST_ALL_INDICE_SUCCESS = 'list_all_indice_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  indices: string[];
  error?: Error;
}

export const initialState: State = {
  loading: false,
  indices: [],
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  error: (state) => state.error,
  indices: (state) => state.indices,
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.LIST_ALL_INDICE](state: State) {
    state.loading = true;
    state.error = undefined;
  },
  [Types.LIST_ALL_INDICE_SUCCESS](state: State, { data }) {
    state.loading = false;
    state.indices = data;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.indices = [];
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async listAllIndice(store: ActionContext<State, any>) {
    try {
      store.commit(Types.LIST_ALL_INDICE);

      const data = await ElasticsearchService.listAllIndice().toPromise();
      if (data && data.length) {
        store.commit(Types.LIST_ALL_INDICE_SUCCESS, { data });
      } else {
        store.commit(Types.NO_RESULT);
      }

      return data;
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
