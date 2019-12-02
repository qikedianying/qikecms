<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { removeToken } from './utils/auth'

export default {
  name: 'App',
  mounted() {
    // removeToken()
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
