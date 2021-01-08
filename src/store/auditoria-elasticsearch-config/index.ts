import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

import { FiltroAuditoriaElasticsearch, Page, Pageable, ResultList, ElasticsearchConfig } from '@/models';
import { AuditoriaElasticsearchService } from '@/services';
import { Notification } from 'element-ui';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  UPDATE_MODEL = 'update_model_query',
  UPDATE_MODEL_SUCCESS = 'update_model_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FiltroAuditoriaElasticsearch;
  page: Page<ElasticsearchConfig>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroAuditoriaElasticsearch(),
  page: new Page<ElasticsearchConfig>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  filter: (state) => state.filter,
  loading: (state) => state.loading,
  resultList: (state) => new ResultList<ElasticsearchConfig>(state.page, state.pageable, state.error),
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
    state.page = new Page<ElasticsearchConfig>();
    state.pageable = new Pageable();
    state.error = undefined;

    Notification.info({
      title: 'Informativo',
      message: 'Nenhum registro encontrado.',
    });
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroAuditoriaElasticsearch();
    state.page = new Page<ElasticsearchConfig>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
  [Types.UPDATE_MODEL](state: State) {
    state.loading = true;
  },
  [Types.UPDATE_MODEL_SUCCESS](state: State, elasticsearch: ElasticsearchConfig) {
    state.page.data.forEach((model: ElasticsearchConfig) => {
      if (model.id === elasticsearch.id) {
        model.readOnly = elasticsearch.readOnly || model.readOnly;
        model.readOnlyAllowDelete = elasticsearch.readOnlyAllowDelete || model.readOnlyAllowDelete;
        model.refreshInterval = elasticsearch.refreshInterval || model.refreshInterval;
        state.loading = false;
      }
    });
  },
} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { filter, pageable }) {
    try {
      store.commit(Types.QUERY, { filter, pageable });

      const page = await AuditoriaElasticsearchService.listConfigIndices(filter, pageable).toPromise();

      if (page.isNotEmpty()) {
        page.data.sort((a, b) => b.count - a.count);

        store.commit(Types.QUERY_SUCCESS, { page });

      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async setConfigIndice(store: ActionContext<State, any>, model: ElasticsearchConfig ) {
    try {
      store.commit(Types.UPDATE_MODEL);

      await AuditoriaElasticsearchService.setConfigIndice(model).toPromise();
      if (model.config) {
        store.dispatch('auditoria-elasticsearch-config/query', {
          filter: new FiltroAuditoriaElasticsearch(), pageable: new Pageable(),
        }, { root: true });
      }

      store.commit(Types.UPDATE_MODEL_SUCCESS, model);
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
