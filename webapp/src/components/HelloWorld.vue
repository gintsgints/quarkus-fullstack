<template>
  <div @keyup.enter="addTask">
    <h1>{{ msg }}</h1>
    <h4 v-if="state.error" class="error">
      Data connection problem: {{ state.error }}
    </h4>
    <input v-model="taskname" type="text" placeholder="Write task to add" />
    <button :disabled="taskname.length === 0" @click="addTask">Add task</button>
    <div>
      <button @click="clearTasks">Remove finished tasks</button>
    </div>
    <Suspense>
      <template #default>
        <Tasks />
      </template>
    </Suspense>
    <div v-if="state.loading" class="lds-hourglass"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import { useState } from '../store'

const Tasks = defineAsyncComponent(() =>
  import('@/components/Tasks.vue' /* webpackChunkName: "tasks" */)
)

export default defineComponent({
  setup() {
    const taskname = ref('')
    const state = useState()

    const addTask = () => {
      if (taskname.value.length > 0) {
        state.addTask({
          name: taskname.value,
          due: new Date(),
          done: false
        })
        taskname.value = ''
      }
    }
    const clearTasks = () => {
      state.clearTasks()
    }

    return { state, taskname, addTask, clearTasks }
  },
  name: 'HelloWorld',
  components: {
    Tasks
  },
  props: {
    msg: String
  }
})
</script>

<style scoped>
.error {
  color: red;
}
</style>
