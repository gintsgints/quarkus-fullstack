<script setup lang="ts">
import { ref } from 'vue'
import { useState, Task } from '../store'

const error = ref(null)
const state = useState()

const updateTask = async (id: number, task: Task) => {
  task.done = !task.done
  await state.updateTask(id, task)
}

try {
  await state.getTasks()
} catch (e) {
  error.value = e
}
</script>

<template>
  <div class="grid">
    <div v-for="task in state.tasks" v-bind:key="task.id">
      <input
        @click="updateTask(task.id, task)"
        v-model="task.done"
        type="checkbox"
      />
      {{ task.name }}
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

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
