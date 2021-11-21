<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useState } from '../store'
import Tasks from '@/components/Tasks.vue'

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

defineProps<{ msg: string }>()
</script>
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

<style scoped>
.error {
  color: red;
}
</style>
