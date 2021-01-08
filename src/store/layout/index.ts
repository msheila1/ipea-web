import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex';

export enum Types {
  TOGGLE_SIDEBAR = 'toggle_sidebar',

  CLEAR = 'clear',
}

export interface State {
  sidebarCollapsed: boolean;
}

export const initialState: State = {
  sidebarCollapsed: false,
};

export const getters: GetterTree<State, any> = {
  sidebarCollapsed: (state) => state.sidebarCollapsed,
};

export const mutations = {
  [Types.TOGGLE_SIDEBAR](state: State) {
    state.sidebarCollapsed = !state.sidebarCollapsed;
  },
  [Types.CLEAR](state: State) {
    state.sidebarCollapsed = false;
  },
} as MutationTree<State>;

export const actions = {
  async toggleSidebar(store: ActionContext<State, any>) {
    store.commit(Types.TOGGLE_SIDEBAR);
  },
} as ActionTree<State, any>;

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
