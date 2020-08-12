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
  counter: number
  tasks: Array<Task>
}

// declare state
const state: State = {
  counter: 0,
  tasks: []
}

// Mutations & actions enums
export enum MutationTypes {
  INC_COUNTER = 'SET_COUNTER',
  SET_TASKS = 'SET_TASKS',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

export enum ActionTypes {
  INC_COUNTER = 'SET_COUNTER',
  GET_TASKS = 'GET_TASKS',
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

export type Mutations<S = State> = {
  [ MutationTypes.INC_COUNTER ](state: S, payload: number): void
  [ MutationTypes.SET_TASKS ](state: S, payload: Array<Task>): void
  [ MutationTypes.ADD_TASK ](state: S, payload: Task): void
  [ MutationTypes.UPDATE_TASK ](state: S, payload: Task): void
}

const mutations: MutationTree<State> & Mutations = {
  [ MutationTypes.INC_COUNTER ](state: State, payload: number) {
    state.counter += payload
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
  [ ActionTypes.INC_COUNTER ](
    { commit }: AugmentedActionContext,
    payload: number
  ): void
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
  [ ActionTypes.INC_COUNTER ]({ commit }, payload: number) {
    commit(MutationTypes.INC_COUNTER, payload)
  },
  async [ ActionTypes.GET_TASKS ]({ commit }) {
    const response = await fetch('/api/task')
    const respobject = await response.json()
    commit(MutationTypes.SET_TASKS, respobject)
  },
  async [ ActionTypes.ADD_TASK ]({ commit }, payload: Task) {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const respobject = await response.json()
    commit(MutationTypes.ADD_TASK, respobject)
  },
  async [ ActionTypes.UPDATE_TASK ]({ commit }, payload: { id: number; task: Task }) {
    const response = await fetch(`/api/task/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload.task)
    })
    const respobject = await response.json()
    commit(MutationTypes.UPDATE_TASK, respobject)
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
