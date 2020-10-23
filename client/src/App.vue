<template lang="pug">
  v-app
    app-bar
    v-main(id="main")
      v-container(fluid)
        router-view
    v-footer(app)
      div Footer content

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
