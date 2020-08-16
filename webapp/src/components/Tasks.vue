<template>
  <div class="grid">
    <div v-for="task in state.tasks" v-bind:key="task.id">
      <input @click="updateTask(task.id, task)" v-model="task.done" type="checkbox" />
      {{task.name}}
    </div>
    <div v-if="error">{{error}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore, ActionTypes, Task } from '../store'

export default defineComponent({
  async setup() {
    const error = ref(null)
    const store = useStore()
    const state = ref(store.state)

    const updateTask = (id: number, task: Task) => {
      task.done = !task.done
      store.dispatch(ActionTypes.UPDATE_TASK, { id, task })
    }

    try {
      await store.dispatch(ActionTypes.GET_TASKS, {})
    } catch (e) {
      error.value = e
    }

    return {
      error,
      state,
      updateTask
    }
  },
  name: 'Tasks'
})
</script>

<style scoped>
.grid {
  display: grid;
  justify-items: start;
  grid-template-columns: 25% [done] 50% [task] 25%;
}

.grid > div {
  grid-column-start: 2;
}
</style>
