import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';
import _ from 'lodash';

import { AuthService } from '@/services';

export enum Types {
  CLEAR = 'clear',
  INIT = 'init',
  INIT_SUCCESS = 'init_success',
  LOGOUT = 'logout',
  TOKEN_EXPIRED = 'token_expired',
  TOKEN_UPDATED = 'token_updated',
  UPDATE_TOKEN = 'update_token',

  FAILURE = 'failure',
}

export interface State {
  authz: any;
  loading: boolean;
  profile: any;
  updated: boolean;
  error?: Error;
}

export const initialState: State = {
  authz: null,
  loading: false,
  profile: {},
  updated: false,
  error: undefined,
};

export const getters: GetterTree<State, any> = {
  authenticated: (state) => state.authz && state.authz.authenticated,
  isAdmin: (state) => state.profile.isAdmin,
  profile: (state) => state.profile,
};

export const mutations = {
  [Types.CLEAR](state: State) {
    state.authz = null;
    state.loading = false;
    state.profile = {};
    state.updated = false;
    state.error = undefined;
  },
  [Types.INIT](state: State) {
    state.loading = true;
  },
  [Types.INIT_SUCCESS](state: State, { authz }) {
    state.loading = false;
    state.authz = authz;
    state.profile = {
      firstName: authz.tokenParsed.given_name,
      lastName: authz.tokenParsed.family_name,
      fullName: authz.tokenParsed.name,
      username: authz.tokenParsed.preferred_username,
      userid: authz.subject,
      roles: authz.realmAccess ? authz.realmAccess.roles : null,
      isAdmin: authz.realmAccess ? _.find(authz.realmAccess.roles, (str) => {
        return _.upperCase(str) === 'ADMINISTRADOR';
      }) : null,
    };

    const roles = _.filter(authz.realmAccess.roles, (role) => {
      return role !== 'offline_access' && role !== 'uma_authorization';
    });

    state.profile.occupation = roles && roles.length ? roles[0] : 'Usuário do Sistema';
  },
  [Types.FAILURE](state: State, { error }) {
    state.authz = null;
    state.loading = false;
    state.profile = {};
    state.error = error;
  },
  [Types.LOGOUT](state: State) {
    state.authz = null;
  },
  [Types.UPDATE_TOKEN](state: State) {
    state.updated = false;
  },
  [Types.TOKEN_UPDATED](state: State, { updated }) {
    state.updated = updated;
  },
  [Types.TOKEN_EXPIRED](state: State) {
    state.authz = null;
  },
} as MutationTree<State>;

export const actions = {
  async init(store: ActionContext<State, any>) {
    try {
      store.commit(Types.INIT);

      const { data } = await AuthService.init();
      store.commit(Types.INIT_SUCCESS, { authz: data.authz });

      return data;
    } catch (error) {
      store.commit(Types.FAILURE, { error });
      throw error;
    }
  },

  async updateToken(store: ActionContext<State, any>) {
    try {
      store.commit(Types.UPDATE_TOKEN);

      const updated = await AuthService.updateToken();
      if (updated) {
        store.commit(Types.TOKEN_UPDATED, updated);
      }

      return store.state.authz.token;
    } catch (error) {
      store.commit(Types.TOKEN_EXPIRED, { error });
      throw error;
    }
  },

  async getToken(store: ActionContext<State, any>) {
    try {
      store.commit(Types.UPDATE_TOKEN);

      const updated = await AuthService.updateToken();
      if (updated) {
        store.commit(Types.TOKEN_UPDATED, { updated });
      }

      return store.state.authz.token;
    } catch (error) {
      store.commit(Types.TOKEN_EXPIRED, { error });
      throw error;
    }
  },

  async logout(store: ActionContext<State, any>): Promise<void> {
    store.commit(Types.LOGOUT);
    await AuthService.logout();

    store.dispatch('clear', {}, { root: true });
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
