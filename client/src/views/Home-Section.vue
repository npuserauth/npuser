<template lang="pug">
  div(:id="id", class="mypage")
    div(class="middle")
      h1(class="text-center", v-text-to-html="sectionDef.title")
      v-row(v-for="(m, index) in sectionDef.text", :key="index", justify="space-around")
        v-card(class="myCard")
          v-card-title {{m.title}}
          div(v-if="m.imgSrc", class="my-card-image-wrapper")
            v-img(:src="require(`../assets/${m.imgSrc}`)", :alt="m.imgAlt", contain, height="400px", width="600px")
          v-card-text(class="mycardtext", v-text-to-html="m.body")
</template>

<script>
  export default {
    name: 'HomeSection',
    props: {
      sectionDef: { type: Object },
    },
    computed: {
      id () {
        return this.sectionDef.id
      },
    },
  }
</script>

<style scoped>

</style>
