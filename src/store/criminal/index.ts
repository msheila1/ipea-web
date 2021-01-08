import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import { Criminal } from '@/models';
import { PessoasService } from '@/services';

export enum Types {
  MODAL = 'list_all',
  MODAL_SUCCESS = 'list_all_success',
  NO_RESULT = 'no_result',
  CLEAR = 'clear',

  FAILURE = 'failure',
}

export interface State {
  loading: boolean;
  id: string;
  pessoaId: string;
  modal: Criminal;
  error?: Error;
}

export const initialState: State = {
  loading: false,
  id: '',
  pessoaId: '',
  modal: new Criminal(),
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  modal: (state) => state.modal,
  error: (state) => state.error,
  loading: (state) => state.loading,
};

export const mutations = {
  [Types.MODAL](state: State, { id, pessoaId }) {
    state.id = id;
    state.pessoaId = pessoaId;
    state.loading = true;
    state.error = undefined;
  },
  [Types.MODAL_SUCCESS](state: State, { data }) {
    state.loading = false;
    state.modal = { ...data };
    state.error = undefined;
  },
  [Types.NO_RESULT](state: State) {
    state.loading = false;
    state.id = '';
    state.pessoaId = '';
    state.modal = new Criminal();
    state.error = undefined;
  },
  [Types.FAILURE](state: State, { error }) {
    state.loading = false;
    state.id = '';
    state.pessoaId = '';
    state.error = error;
  },
} as MutationTree<State>;

export const actions = {
  async findById(store: ActionContext<State, any>, { id, pessoaId }) {
    try {
      store.commit(Types.MODAL, { id, pessoaId });

      const data = await  PessoasService.findCriminalById(id, pessoaId).toPromise();

      if (data) {
        store.commit(Types.MODAL_SUCCESS, { data });
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
