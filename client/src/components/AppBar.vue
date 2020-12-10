<template lang="pug">
  v-app-bar(app, elevate-on-scroll, scroll-target="#main")
    //v-app-bar-nav-icon
    v-img(class="ml-2", src="../assets/npuser-icon@0.25x.png", max-width="40px", max-height="40px")
    router-link(to="#intro",class="ml-2 rlink")
      v-toolbar-title(class="") {{appText.appTitle}}
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

<style lang="scss" scoped>
  .rlink {
    color: black;
    margin-left: 1rem;

  }
  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:active {
    text-decoration: underline;
  }
</style>
