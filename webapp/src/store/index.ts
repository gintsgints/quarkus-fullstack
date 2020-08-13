import {
  createStore, MutationTree, ActionContext, ActionTree,
  GetterTree, CommitOptions, DispatchOptions, createLogger,
  Store as VuexStore
} from 'vuex'

export type Task = {
  id?: number
  name: string
  due: Date
  done: boolean
}

export type State = {
  loading: boolean
  tasks: Array<Task>
}

// declare state
const state: State = {
  loading: false,
  tasks: []
}

// Mutations & actions enums
export enum MutationTypes {
  SET_LOADING = 'SET_LOADING',
  SET_TASKS = 'SET_TASKS',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

export enum ActionTypes {
  GET_TASKS = 'GET_TASKS',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

export type Mutations<S = State> = {
  [ MutationTypes.SET_LOADING ](state: S, payload: boolean): void
  [ MutationTypes.SET_TASKS ](state: S, payload: Array<Task>): void
  [ MutationTypes.ADD_TASK ](state: S, payload: Task): void
  [ MutationTypes.UPDATE_TASK ](state: S, payload: Task): void
}

const mutations: MutationTree<State> & Mutations = {
  [ MutationTypes.SET_LOADING ](state: State, payload: boolean) {
    state.loading = payload
  },
  [ MutationTypes.SET_TASKS ](state: State, payload: Array<Task>) {
    state.tasks = payload
  },
  [ MutationTypes.ADD_TASK ](state: State, payload: Task) {
    state.tasks.push(payload)
  },
  [ MutationTypes.UPDATE_TASK ](state: State, payload: Task) {
    const index = state.tasks.findIndex((t: Task) => {
      return t.id === payload.id
    })
    state.tasks[ index ] = payload
  }
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[ K ]>[ 1 ]
  ): ReturnType<Mutations[ K ]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ ActionTypes.GET_TASKS ](
    { commit }: AugmentedActionContext,
    // eslint-disable-next-line
    payload: any): void
  [ ActionTypes.ADD_TASK ](
    { commit }: AugmentedActionContext,
    // eslint-disable-next-line
    payload: Task): void
  [ ActionTypes.UPDATE_TASK ](
    { commit }: AugmentedActionContext,
    // eslint-disable-next-line
    payload: { id: number, task: Task }): void
}

export const actions: ActionTree<State, State> & Actions = {
  async [ ActionTypes.GET_TASKS ]({ commit }) {
    commit(MutationTypes.SET_LOADING, true)
    const response = await fetch('/api/task')
    const respobject = await response.json()
    commit(MutationTypes.SET_TASKS, respobject)
    commit(MutationTypes.SET_LOADING, false)
  },
  async [ ActionTypes.ADD_TASK ]({ commit }, payload: Task) {
    commit(MutationTypes.SET_LOADING, true)
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const respobject = await response.json()
    commit(MutationTypes.ADD_TASK, respobject)
    commit(MutationTypes.SET_LOADING, false)
  },
  async [ ActionTypes.UPDATE_TASK ]({ commit }, payload: { id: number; task: Task }) {
    commit(MutationTypes.SET_LOADING, true)
    const response = await fetch(`/api/task/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.task)
    })
    const respobject = await response.json()
    commit(MutationTypes.UPDATE_TASK, respobject)
    commit(MutationTypes.SET_LOADING, false)
  }
}

export type Getters = {
  loading(state: State): boolean
}

export const getters: GetterTree<State, State> & Getters = {
  loading: (state) => {
    return state.loading
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
