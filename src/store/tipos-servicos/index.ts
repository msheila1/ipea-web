import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import _ from 'lodash';

import { TipoServico } from '@/models';
import { TiposServicosService } from '@/services';

export enum Types {
  LIST_ALL = 'list_all',
  LIST_ALL_SUCCESS = 'list_all_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  data: TipoServico[];
  error?: Error;
}

export const initialState: State = {
  loading: false,
  data: [],
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  cacheaveis: (state) => _.filter(state.data, ['cacheable', true]),
  data: (state) => state.data,
  error: (state) => state.error,
  externos: (state) => _.filter(state.data, ['external', true]),
  internos: (state) => _.filter(state.data, ['external', false]),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.LIST_ALL](state: State) {
    state.loading = true;
    state.error = undefined;
  },
  [Types.LIST_ALL_SUCCESS](state: State, { data }) {
    state.loading = false;
    state.data = data;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.data = [];
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async listAll(store: ActionContext<State, any>) {
    try {
      store.commit(Types.LIST_ALL);

      const data = await TiposServicosService.listAll().toPromise();
      if (data && data.length) {
        store.commit(Types.LIST_ALL_SUCCESS, { data });
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
