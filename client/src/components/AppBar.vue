<template lang="pug">
  v-app-bar(app, elevate-on-scroll, scroll-target="#main")
    //v-app-bar-nav-icon
    v-toolbar-title {{appText.appTitle}}
    v-spacer
    router-link(v-for="(lk, index) in appText.topLinks", :key="index", :to="lk.hash", class="rlink") {{lk.text}}

</template>
<!--
:to=`/#${lk.hash}`,
The scroll to hash depends on the scrollBehavior inside router.ts
-->
<!--
    v-btn(icon, to="/#sso")
      v-icon mdi-heart
    v-btn(icon, to="/#npuser-values")
      v-icon mdi-magnify
    v-btn(icon, to="/#intro")
      v-icon mdi-dots-vertical
-->

<script>
  import { appText } from '@/appText'
  export default {
    data: () => ({
      appText,
    }),
  }
</script>

<style scoped>
.rlink {
  colour: black;;
  margin-left: 1rem;
}
</style>
