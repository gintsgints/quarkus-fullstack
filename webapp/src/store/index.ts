import { reactive, provide, inject } from 'vue'

export type Task = {
  id?: number
  name: string
  due: Date
  done: boolean
}

export class State {
  private loading = false
  private loaded = false
  private error = ''
  private tasks: Array<Task> = []
  async getTasks() {
    if (!this.loaded) {
      this.loading = true
      try {
        const response = await fetch('/api/task')
        if (!response.ok) {
          throw Error(response.statusText)
        }
        const respobject = await response.json()
        this.tasks = respobject
        this.loaded = true
      } catch (error) {
        this.error = error
      }
      this.loading = false
    }
  }

  async updateTask(id: number, task: Task) {
    this.loading = true
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const respobject = await response.json()
      const index = this.tasks.findIndex((t: Task) => {
        return t.id === respobject.id
      })
      this.tasks[ index ] = respobject
    } catch (error) {
      this.error = error
    }
    this.loading = false
  }

  async addTask(task: Task) {
    this.loading = true
    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const respobject = await response.json()
      this.tasks.push(respobject)
    } catch (error) {
      this.error = error
    }
    this.loading = false
  }

  async clearTasks() {
    this.loading = true
    try {
      const resp1 = await fetch('/api/task/clear')
      if (!resp1.ok) {
        throw Error(resp1.statusText)
      }
      const response = await fetch('/api/task')
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const respobject = await response.json()
      this.tasks = respobject
    } catch (error) {
      this.error = error
    }
    this.loading = false
  }
}

export const stateSymbol = Symbol('state')
export const createState = () => {
  return reactive(new State())
}

export const useState = () => inject(stateSymbol) as State
export const provideState = () => provide(
  stateSymbol,
  createState()
)
