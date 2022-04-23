<script setup lang="ts">
import { ref } from 'vue'
import Tasks from '@/components/Tasks.vue'
import { useStore } from '@/stores/tasks'

const taskname = ref('')
const tasks = useStore()

const addTask = () => {
  if (taskname.value.length > 0) {
    tasks.addTask({
      name: taskname.value,
      due: new Date(),
      done: false
    })
    taskname.value = ''
  }
}
const clearTasks = () => {
  tasks.clearTasks()
}

defineProps<{ msg: string }>()
</script>
<template>
  <div @keyup.enter="addTask">
    <h1>{{ msg }}</h1>
    <h4 v-if="tasks.error" class="error">Data connection problem: {{ tasks.error }}</h4>
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
    <div v-if="tasks.loading" class="lds-hourglass"></div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
