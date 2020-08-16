<template>
  <div @keyup.enter="addTask">
    <h1>{{ msg }}</h1>
    <h4 class="error">Data connection problem: {{ state.error }}</h4>
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
    <div v-if="loading" class="lds-hourglass"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore, ActionTypes } from '../store'
import Tasks from '@/components/Tasks.vue'

export default defineComponent({
  setup() {
    const taskname = ref('')
    const store = useStore()
    const state = ref(store.state)
    const addTask = () => {
      if (taskname.value.length > 0) {
        store.dispatch(ActionTypes.ADD_TASK, { name: taskname.value, due: new Date(), done: false })
        taskname.value = ''
      }
    }
    const clearTasks = () => {
      store.dispatch(ActionTypes.CLEAR_TASKS, {})
    }
    const loading = computed(() => store.getters.loading)

    return {
      taskname,
      state,
      addTask,
      clearTasks,
      loading
    }
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
