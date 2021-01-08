import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import _ from 'lodash';

import { FiltroSuspeito, Page, Pageable, ResultList, Suspeito, Foto } from '@/models';
import { SuspeitosService, FotosService } from '@/services';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  NO_RESULT = 'no_result',
  SELECT_FOTO = 'select_foto',
  UNSELECT_ALL = 'unselect_all',
  FETCH_FOTO = 'fetch_foto',
  FETCH_FOTO_SUCCESS = 'fetch_foto_success',
  FETCH_FOTO_NO_RESULT = 'fetch_foto_no_result',
  CLEAR = 'clear',
  RELOAD_FOTO = 'reload_foto',
  RELOAD_FOTO_SUCCESS = 'reload_foto_success',
  RELOAD_FOTO_NO_RESULT = 'reload_foto_no_result',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  filter: FiltroSuspeito;
  page: Page<Suspeito>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  filter: new FiltroSuspeito(),
  page: new Page<Suspeito>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  reconhecidos: (state) => state.page.data.filter((s) => s.reconhecido),
  resultList: (state) => new ResultList<Suspeito>(state.page, state.pageable, state.error),
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.QUERY](state: State, { filter, pageable }) {
    state.loading = true;
    state.filter = { ...filter };
    state.pageable = { ...pageable };
    state.error = undefined;
  },
  [Types.QUERY_SUCCESS](state: State, { page, coordenadas }) {
    state.loading = false;
    state.page = { ...page };
    state.error = undefined;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.page = new Page<Suspeito>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.FETCH_FOTO](state: State, { suspeito }) {
    state.page.data.forEach((s: Suspeito) => {
      if (s.id === suspeito.id) {
        s.loading = true;
      }
    });
  },
  [Types.FETCH_FOTO_SUCCESS](state: State, { suspeito, fotos }) {
    state.page.data.forEach((s: Suspeito) => {
      if (s.id === suspeito.id) {
        s.loading = false;

        fotos = _.sortBy(fotos, [ (f: Foto) => {
          return f.expiraEnum;
        }]);
        s.fotos = fotos;
      }

      s.done = !!(s.fotos && s.fotos.length > 0 && !s.fotos[0].error);
    });

    state.page.data = _.orderBy(state.page.data, ({ done }) => {
      return done;
    }, ['desc']);

  },
  [Types.RELOAD_FOTO](state: State, { suspeito, foto }) {
    state.page.data.forEach((s: Suspeito) => {
      if (s.id === suspeito.id) {
        s.loading = true;
      }
    });
  },
  [Types.RELOAD_FOTO_SUCCESS](state: State, { suspeito, fotos, foto }) {
    state.page.data.forEach((s: Suspeito) => {
      if (s.id === suspeito.id) {
        s.loading = false;
        let novasFotos: Foto[] = s.fotos || [];

        _.forEach(fotos, (newFoto: Foto) => {
             if (s.fotos && newFoto.expiraEnum !== 'TIMEOUT') {
               novasFotos.push(newFoto);
             }
        });

        /* remover a imagem de foto quebrada */
        _.remove(novasFotos, (f: Foto) => {
             return f.expiraEnum === 'TIMEOUT' && f.codigoOrigem === foto.codigoOrigem;
        });

        novasFotos = _.sortBy(novasFotos, [ (f: Foto) => {
          return f.expiraEnum;
        }]);

        s.fotos = novasFotos;
      }
    });
  },
  [Types.SELECT_FOTO](state: State, { foto, suspeito }) {
    state.page.data.forEach((s: Suspeito) => {
      if (s.id === suspeito.id && s.fotos) {

        // Marca ou Desmarca a foto na liste de suspeitos original
        s.fotos.forEach((f: Foto) => {
          if (f.id === foto.id) {
            f.selecionada = !f.selecionada;
          }
        });

        s.reconhecido = _.some(s.fotos, ['selecionada', true ]);
      }
    });
  },
  [Types.UNSELECT_ALL](state: State) {
    state.page.data.forEach((suspeito: Suspeito) => {
      if (suspeito.fotos) {
        suspeito.fotos.forEach((foto: Foto) => {
          foto.selecionada = false;
        });
      }

      suspeito.reconhecido = false;
    });
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroSuspeito();
    state.page = new Page<Suspeito>();
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

      const page = await SuspeitosService.query(filter, pageable).toPromise();
      if (page.isNotEmpty()) {
        store.commit(Types.QUERY_SUCCESS, { page });

        page.data.forEach((suspeito: Suspeito) => {
          store.dispatch('ocorrencias-suspeitos/fetchFoto', { suspeito }, { root: true });
        });

      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async fetchFoto(store: ActionContext<State, any>, { suspeito }) {
    try {
      store.commit(Types.FETCH_FOTO, { suspeito });

      const fotos = await FotosService.list({ rg: suspeito.rg, cpf: suspeito.cpf }).toPromise();

      store.commit(Types.FETCH_FOTO_SUCCESS, { suspeito, fotos });

      return fotos;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async reloadFoto(store: ActionContext<State, any>, { suspeito, foto }) {
    try {
      store.commit(Types.RELOAD_FOTO, { suspeito, foto });

      let filter: any = { rg: suspeito.rg, cpf: suspeito.cpf };
      if (foto) {
        filter = { rg: suspeito.rg, cpf: suspeito.cpf, updateCache: true, codigoOrigem: foto.codigoOrigem };
      }
      const fotos = await FotosService.list(filter).toPromise();

      store.commit(Types.RELOAD_FOTO_SUCCESS, { suspeito, fotos, foto });

      return fotos;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async selectFoto(store: ActionContext<State, any>, { foto, suspeito }): Promise<void> {
    store.commit(Types.SELECT_FOTO, { foto, suspeito });
  },

  async unselectAll(store: ActionContext<State, any>): Promise<void> {
    store.commit(Types.UNSELECT_ALL);
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
