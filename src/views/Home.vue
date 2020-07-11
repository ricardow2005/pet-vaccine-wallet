<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ClientesList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ClientesList from '@/components/ClientesList.vue'

export default {
  name: 'Home',
  components: {
    ClientesList
  }
}
</script>
