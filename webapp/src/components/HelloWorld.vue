<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="inc">Press me</button>
    <h5>Counter: {{state.counter}}</h5>
    <h5>Double counter: {{doubleCounter}}</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore, MutationTypes } from '../store'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })

    const store = useStore()
    const state = ref(store.state)
    const inc = () => {
      store.commit(MutationTypes.INC_COUNTER, 1)
    }

    const doubleCounter = computed(() => store.getters.doubleCounter)

    return {
      state,
      inc,
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
