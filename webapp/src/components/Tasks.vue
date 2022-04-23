<script setup lang="ts">
import { ref } from 'vue'
import { useStore, Task } from '@/stores/tasks'

const tasks = useStore()
const error = ref('')

const updateTask = async (id: number | undefined, task: Task) => {
  if (id) {
    task.done = !task.done
    await tasks.updateTask(id, task)
  }
}

try {
  await tasks.getTasks()
} catch {
  error.value = 'Error getting tasks'
}
</script>

<template>
  <div class="grid">
    <div v-for="task in tasks.tasks" v-bind:key="task.id">
      <input @click="updateTask(task.id, task)" v-model="task.done" type="checkbox" />
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
