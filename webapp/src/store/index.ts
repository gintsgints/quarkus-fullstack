import {
  createStore, MutationTree, ActionContext, ActionTree,
  GetterTree, CommitOptions, DispatchOptions, createLogger,
  Store as VuexStore
} from 'vuex'

export type State = {
  counter: number
  msg: string
}

// declare state
const state: State = {
  counter: 0,
  msg: ''
}

// Mutations & actions enums
export enum MutationTypes {
  INC_COUNTER = 'SET_COUNTER',
  SET_HELLO = 'SET_HELLO'
}

export enum ActionTypes {
  INC_COUNTER = 'SET_COUNTER',
  HELLO = 'HELLO'
}

export type Mutations<S = State> = {
  [ MutationTypes.INC_COUNTER ](state: S, payload: number): void
  [ MutationTypes.SET_HELLO ](state: S, payload: string): void
}

const mutations: MutationTree<State> & Mutations = {
  [ MutationTypes.INC_COUNTER ](state: State, payload: number) {
    state.counter += payload
  },
  [ MutationTypes.SET_HELLO ](state: State, payload: string) {
    state.msg = payload
  }
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[ K ]>[ 1 ]
  ): ReturnType<Mutations[ K ]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ ActionTypes.INC_COUNTER ](
    { commit }: AugmentedActionContext,
    payload: number
  ): void
  [ ActionTypes.HELLO ](
    { commit }: AugmentedActionContext,
    // eslint-disable-next-line
    payload: any): void
}

export const actions: ActionTree<State, State> & Actions = {
  [ ActionTypes.INC_COUNTER ]({ commit }, payload: number) {
    commit(MutationTypes.INC_COUNTER, payload)
  },
  async [ ActionTypes.HELLO ]({ commit }) {
    const response = await fetch('/api/hello')
    const respobject = await response.json()
    commit(MutationTypes.SET_HELLO, respobject.msg)
  }
}

export type Getters = {
  doubleCounter(state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
  doubleCounter: (state) => {
    return state.counter * 2
  }
}

export type Store = Omit<
  VuexStore<State>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[ K ]>[ 1 ]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[ K ]>
} & {
  getters: {
    [ K in keyof Getters ]: ReturnType<Getters[ K ]>
  }
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[ K ]>[ 1 ],
    options?: DispatchOptions
  ): ReturnType<Actions[ K ]>
}

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [ createLogger() ]
})

export function useStore() {
  return store as Store
}
