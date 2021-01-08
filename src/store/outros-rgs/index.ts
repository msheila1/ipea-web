import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { OutroRg, Page, Pageable, ResultList } from '@/models';
import { OutrosRgsService } from '@/services';
import _ from 'lodash';

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
  pessoaId?: string;
  page: Page<OutroRg>;
  pageCopy: Page<OutroRg>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  pessoaId: undefined,
  page: new Page<OutroRg>(),
  pageCopy: new Page<OutroRg>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  resultList: (state) => new ResultList<OutroRg>(state.pageCopy, state.pageable, state.error),
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
    state.error = undefined;
  },
  [Types.PAGE_SUCCESS](state: State, { pageable }) {
    state.loading = false;
    state.pageable = { ...pageable };
    // tslint:disable-next-line:max-line-length
    state.pageCopy = Page.newInstance<OutroRg>(state.page.data, state.pageable.pageNumber, state.pageable.pageSize);
    state.error = undefined;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<OutroRg>();
    state.pageable = new Pageable();
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.pessoaId = undefined;
    state.page = new Page<OutroRg>();
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

      const page = await OutrosRgsService.query(pessoaId, pageable).toPromise();
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

  async listOutrosRgs(store: ActionContext<State, any>, { pessoaId, filter, pageable }) {
    try {
      store.commit(Types.QUERY, { pessoaId, pageable });
      const page = await OutrosRgsService.listOutrosRgs(pessoaId, filter).toPromise();

      if (page.isNotEmpty()) {
        store.commit(Types.QUERY_SUCCESS, { page });
        store.commit(Types.PAGE_SUCCESS, { pageable });
      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

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
