import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { AuditoriaCarga, FiltroAuditoriaCarga, Page, Pageable, ResultList } from '@/models';
import { AuditoriaCargasService } from '@/services';
import { Notification } from 'element-ui';

export enum Types {
  LIST_ALL = 'list_all',
  LIST_ALL_SUCCESS = 'list_all_success',
  LIST_DATA = 'list_data',
  UPDATE = 'update',
  UPDATE_SUCCESS = 'update_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  datas: Date[];
  loading: boolean;
  filter: FiltroAuditoriaCarga;
  page: Page<AuditoriaCarga>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  datas: [],
  loading: false,
  filter: new FiltroAuditoriaCarga(),
  page: new Page<AuditoriaCarga>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  datas: (state) => state.datas,
  filter: (state) => state.filter,
  loading: (state) => state.loading,
  resultList: (state) => new ResultList<AuditoriaCarga>(state.page, state.pageable, state.error),
};

export const mutations = {
  [Types.LIST_ALL](state: State, { filter, pageable }) {
    state.loading = true;
    state.filter = { ...filter };
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.LIST_ALL_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
    state.error = undefined;
  },
  [Types.LIST_DATA](state: State, { datas }) {
    state.datas = { ...datas };
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<AuditoriaCarga>();
    state.pageable = new Pageable();
    state.error = undefined;

    Notification.info({
      title: 'Informativo',
      message: 'Nenhum registro encontrado.',
    });
  },
  [Types.UPDATE](state: State) {
    state.loading = true;
  },
  [Types.UPDATE_SUCCESS](state: State, { page }) {
    state.loading = false;
    state.page = { ...page };
    state.error = undefined;
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroAuditoriaCarga();
    state.page = new Page<AuditoriaCarga>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async list(store: ActionContext<State, any>, { filter }) {
    try {
      store.commit(Types.LIST_ALL, { filter });

      const data = await AuditoriaCargasService.list(filter).toPromise();
      const page = new Page(data, data.length);

      if (page.isNotEmpty()) {
        store.commit(Types.LIST_ALL_SUCCESS, { page });
      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async listData(store: ActionContext<State, any>) {
    try {
      const datas = await AuditoriaCargasService.listData().toPromise();
      store.commit(Types.LIST_DATA, { datas });

      return datas;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async update(store: ActionContext<State, any>) {
    try {
      store.commit(Types.UPDATE);

      const data = await AuditoriaCargasService.update().toPromise();
      const page = new Page(data, data.length);

      store.commit(Types.UPDATE_SUCCESS, { page });

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
