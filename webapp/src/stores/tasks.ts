import { defineStore } from 'pinia'

export type Task = {
  id?: number
  name: string
  due: Date
  done: boolean
}

export const useStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    loaded: false,
    error: ''
  }),
  actions: {
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
        } catch {
          this.error = 'Error getting tasks'
        }
        this.loading = false
      }
    },
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
        this.tasks[index] = respobject
      } catch {
        this.error = 'Error updating task'
      }
      this.loading = false
    },
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
      } catch {
        this.error = 'Error adding task'
      }
      this.loading = false
    },
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
      } catch {
        this.error = 'Error cleaning tasks'
      }
      this.loading = false
    }
  }
})