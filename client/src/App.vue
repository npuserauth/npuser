<template lang="pug">
  v-app
    v-app-bar(app, color="primary", dark)
      div(class="d-flex align-center")
        div No Password User Authentication
      v-spacer
    v-main
      router-view
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
})
</script>
