<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="taskname" type="text" />
    <button @click="addTask">Add task</button>
    <div v-for="task in state.tasks" v-bind:key="task.id">{{task.name}}</div>
    <h5>Counter: {{state.counter}}</h5>
    <h5>Double counter: {{doubleCounter}}</h5>
    <button @click="hello">Call Hello API</button>
    <h5>API Message: {{state.msg}}</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore, ActionTypes } from '../store'

export default defineComponent({
  setup() {
    const taskname = ref('')
    const store = useStore()
    const state = ref(store.state)
    const addTask = () => {
      store.dispatch(ActionTypes.ADD_TASK, { name: taskname.value, due: '2020-08-11', done: false })
    }
    const hello = () => {
      store.dispatch(ActionTypes.HELLO, {})
    }
    onMounted(() => {
      store.dispatch(ActionTypes.GET_TASKS, {})
    })
    const doubleCounter = computed(() => store.getters.doubleCounter)

    return {
      taskname,
      state,
      addTask,
      hello,
      doubleCounter
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
