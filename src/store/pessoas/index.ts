import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import { Notification } from 'element-ui';

import { FiltroPessoa, Page, Pageable, ResultList, Pessoa, Foto } from '@/models';
import { ImabService, PessoasService, FotosService } from '@/services';
import _ from 'lodash';

export enum Types {
  QUERY = 'query',
  QUERY_SUCCESS = 'query_success',
  FIND_FOTO =  'find_foto',
  FIND_FOTO_SUCCESS =  'find_foto_success',
  FIND_FOTO_FAILURE = 'find_foto_failure',
  LIST_FOTO =  'fetch_foto',
  LIST_FOTO_SUCCESS =  'fetch_foto_success',
  LIST_FOTO_FAILURE = 'fetch_foto_failure',
  FOTO_NO_RESULT = 'foto_no_result',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',
  RELOAD_FOTO = 'reload_foto',
  RELOAD_FOTO_SUCCESS = 'reload_foto_success',
  RELOAD_FOTO_NO_RESULT = 'reload_foto_no_result',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  loadingFotos: boolean;
  filter: FiltroPessoa;
  fotos: Foto[];
  model: Pessoa;
  page: Page<Pessoa>;
  pageable: Pageable;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  loadingFotos: false,
  filter: new FiltroPessoa(),
  fotos: [],
  model: new Pessoa(),
  page: new Page<Pessoa>(),
  pageable: new Pageable(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  filter: (state) => state.filter,
  fotos: (state) => state.fotos,
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

    Notification.info({
      title: 'Informativo',
      message: 'Nenhum registro encontrado.',
    });
  },
  [Types.CLEAR](state: State) {
    state.loading = false;
    state.filter = new FiltroPessoa();
    state.page = new Page<Pessoa>();
    state.pageable = new Pageable();
    state.error = undefined;
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.error = error;
  },
  [Types.FIND_FOTO](state: State, { pessoa }) {
    state.page.data.forEach((model: Pessoa) => {
      if (model.id === pessoa.id) {
        model.loading = true;
      }
    });
  },
  [Types.FIND_FOTO_SUCCESS](state: State, { pessoa, foto }) {
    state.page.data.forEach((model: Pessoa) => {
      if (model.id === pessoa.id) {
        model.foto = foto;
        model.loading = false;
      }
    });
  },
  [Types.FIND_FOTO_FAILURE](state: State, { pessoa, error }) {
    state.page.data.forEach((model: Pessoa) => {
      if (model.id === pessoa.id) {
        model.loading = true;
      }
    });
    state.error = error;
  },
  [Types.LIST_FOTO](state: State, { pessoa }) {
    state.loadingFotos = true;
    state.fotos = [];
    state.model = { ...pessoa };
  },
  [Types.LIST_FOTO_SUCCESS](state: State, { fotos }) {
    state.loadingFotos = false;

    fotos = _.sortBy(fotos, [ (f: Foto) => {
      return f.expiraEnum;
    }]);

    state.fotos = fotos;
  },
  [Types.LIST_FOTO_FAILURE](state: State, { error }) {
    state.loadingFotos = false;
    state.error = error;
  },
  [Types.FOTO_NO_RESULT](state: State) {
    state.loadingFotos = false;
  },
  [Types.RELOAD_FOTO](state: State, { pessoa }) {
    state.loadingFotos = true;
    state.model = { ...pessoa };
  },
  [Types.RELOAD_FOTO_SUCCESS](state: State, { fotos, foto }) {
    state.loadingFotos = false;

    let novasFotos: Foto[] = state.fotos || [];

    _.forEach(fotos, (newFoto: Foto) => {
          if (state.fotos && newFoto.expiraEnum !== 'TIMEOUT') {
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

    state.fotos = novasFotos;
  },

} as MutationTree<State>;

export const actions = {
  async query(store: ActionContext<State, any>, { filter, pageable }) {
    try {
      store.commit(Types.QUERY, { filter, pageable });

      filter.search = true;
      const page = await PessoasService.query(filter, pageable).toPromise();
      if (page.isNotEmpty()) {

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < page.data.length; i++) {
          page.data[i].foto = new Foto();
          store.dispatch('findFoto', { pessoa: page.data[i] });
        }

        store.commit(Types.QUERY_SUCCESS, { page });

      } else {
        store.commit(Types.NO_RESULT);
      }

      return page;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
    }
  },

  async listFoto(store: ActionContext<State, any>, { pessoa }) {
    try {
      store.commit(Types.LIST_FOTO, { pessoa });

      const fotos = await FotosService.list({ rg: pessoa.rg, cpf: pessoa.cpf }).toPromise();
      store.commit(Types.LIST_FOTO_SUCCESS, { fotos });

      return fotos;
    } catch (error) {
      store.commit(Types.LIST_FOTO_FAILURE, { error });
    }
  },

  async findFoto(store: ActionContext<State, any>, { pessoa }) {
    try {
      if (!pessoa || !pessoa.cpfs || !pessoa.cpfs.length) {
        return null;
      }

      store.commit(Types.FIND_FOTO, { pessoa });

      const foto = await ImabService.findByCpf(pessoa.cpfs[0]).toPromise();
      if (foto) {
        foto.base64 = `data:image/jpg;base64,${foto.base64}`;
        store.commit(Types.FIND_FOTO_SUCCESS, { pessoa, foto });

      } else {
        store.commit(Types.FOTO_NO_RESULT);
      }

      return foto;
    } catch (error) {
      store.commit(Types.FIND_FOTO_FAILURE, { pessoa, error });
    }
  },

  async reloadFoto(store: ActionContext<State, any>, { pessoa, foto }) {
    try {
      store.commit(Types.RELOAD_FOTO, { foto });

      let filter: any = { rg: pessoa.rg, cpf: pessoa.cpf };
      if (foto) {
        filter = { rg: pessoa.rg, cpf: pessoa.cpf, updateCache: true, codigoOrigem: foto.codigoOrigem };
      }
      const fotos = await FotosService.list(filter).toPromise();

      store.commit(Types.RELOAD_FOTO_SUCCESS, { fotos, foto });

      return fotos;
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
