<template>
  <vis-network style="height: 100%;"></vis-network>
</template>

<script>
import VisNetwork from './components/VisNetwork.vue'

export default {
  name: 'App',
  components: {
    VisNetwork
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
}
</style>
