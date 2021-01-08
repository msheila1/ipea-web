import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { Cache, FiltroCache, Page, Pageable, ResultList } from '@/models';
import { CachesService } from '@/services';
import { Notification } from 'element-ui';

export enum Types {
  DELETE = 'delete',
  DELETE_SUCCESS = 'delete_success',
  DELETE_ALL = 'delete_all',
  DELETE_ALL_SUCCESS = 'delete_all_success',
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',
  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FiltroCache;
  page: Page<Cache>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroCache(),
  page: new Page<Cache>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  filter: (state) => state.filter,
  loading: (state) => state.loading,
  resultList: (state) => new ResultList<Cache>(state.page, state.pageable, state.error),
};

export const mutations = {
  [Types.DELETE](state: State) {
    state.loading = true;
  },
  [Types.DELETE_SUCCESS](state: State) {
    state.loading = false;
  },
  [Types.DELETE_ALL](state: State) {
    state.loading = true;
  },
  [Types.DELETE_ALL_SUCCESS](state: State) {
    state.loading = false;
    state.page = new Page<Cache>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
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
    state.page = new Page<Cache>();
    state.pageable = new Pageable();
    state.error = undefined;

    Notification.info({
      title: 'Informativo',
      message: 'Nenhum registro encontrado.',
    });
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroCache();
    state.page = new Page<Cache>();
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

      const page = await CachesService.query(filter, pageable).toPromise();
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

  async delete(store: ActionContext<State, any>, { cache }): Promise<void> {
    try {
      store.commit(Types.DELETE);

      await CachesService.deleteBy({ origem: cache.tipoService }).toPromise();
      store.commit(Types.DELETE_SUCCESS);

    } catch (error) {
      store.commit(Types.FAILURE, { error });
      throw error;
    }
  },

  async deleteAll(store: ActionContext<State, any>): Promise<void> {
    try {
      store.commit(Types.DELETE_ALL);

      await CachesService.deleteAll().toPromise();
      store.commit(Types.DELETE_ALL_SUCCESS);

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
