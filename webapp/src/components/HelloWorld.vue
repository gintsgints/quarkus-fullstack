<template>
  <div @keyup.enter="addTask">
    <h1>{{ msg }}</h1>
    <input v-model="taskname" type="text" placeholder="Write task to add" />
    <button :disabled="taskname.length === 0" @click="addTask">Add task</button>
    <div>
      <button @click="clearTasks" >Remove finished tasks</button>
    </div>
    <div class="grid">
      <div v-for="task in state.tasks" v-bind:key="task.id">
        <div v-if="!loading">
          <input @click="updateTask(task.id, task)" v-model="task.done" type="checkbox" />
          {{task.name}}
        </div>
      </div>
    </div>
    <div v-if="loading" class="lds-hourglass"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore, ActionTypes, Task } from '../store'

export default defineComponent({
  setup() {
    const taskname = ref('')
    const store = useStore()
    const state = ref(store.state)
    const updateTask = (id: number, task: Task) => {
      task.done = !task.done
      store.dispatch(ActionTypes.UPDATE_TASK, { id, task })
    }
    const addTask = () => {
      if (taskname.value.length > 0) {
        store.dispatch(ActionTypes.ADD_TASK, { name: taskname.value, due: new Date(), done: false })
        taskname.value = ''
      }
    }
    const clearTasks = () => {
      store.dispatch(ActionTypes.CLEAR_TASKS, {})
    }
    onMounted(() => {
      store.dispatch(ActionTypes.GET_TASKS, {})
    })
    const loading = computed(() => store.getters.loading)

    return {
      taskname,
      state,
      addTask,
      updateTask,
      clearTasks,
      loading
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
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
