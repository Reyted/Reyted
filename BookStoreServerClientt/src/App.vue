<template>
  <div id="app">
    <server-client></server-client>
  </div>
</template>

<script>
import ServerClient from './components/ServerClient'

// import Vue from 'vue'
// import {setCookie,getCookie,delCookie} from './cookie.js'

export default {
  name: 'App',
  components:{
    'server-client':ServerClient,

  },
  // mounted () {
  //   Vue.prototype.$cookieStore = {
  //     setCookie,
  //     getCookie,
  //     delCookie
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
