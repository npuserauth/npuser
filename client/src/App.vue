<template lang="pug">
  v-app
    app-bar
    v-main(id="main")
      router-view
    v-footer(app)
      div(class="copyright") &#169; 2020 npuser.org

</template>

<script lang="ts">
  import AppBar from './components/AppBar.vue'

  export default {
    name: 'App',
    components: {AppBar},
    data: () => ({
      //
    }),
  }
</script>

<style scoped>
  .copyright {
    font-size: .7rem;
    color: #4e4e4e;
  }
</style>
