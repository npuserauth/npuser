<template lang="pug">
   div(class="outside-view home")
      div(class="parr-page")
         <!-- parallex image container comes before content -->
         div(class="container container1")
         div(class="content")
            header(class="hero")
               div(class="hero-center")
                  h1(class="hero__logo", data-aos="zoom-in") np-auth
                  h2(class="hero__text", data-aos="fade-up", data-aos-easing="ease", data-aos-delay="400") No Password Authentication
            section(class="hero is-info is-medium is-bold")
               div(class="hero-body")
               div(class="container has-text-centered")
                  v-img(src="../assets/npauth.png", alt="np-auth", width="76px")
                  h1(class="title") {{ appText.heroText.title }}
                  h2(class="subtitle") {{ appText.heroText.subTitle }}
            section(class="container features features-light")
               div(class="content", v-text-to-html.noAutoLink="appText.heroText.introText")


      div(class="parr-page middle feature-list")
         h1 Middle page 1
         section(class="no-container features features-dark")
            ed-ehr-values
         div(class="content-middle")
            h2(class="section-title") Features

</template>

<script>
import EdEhrValues from '../components/NpValues.vue'
import { appText } from '@/appText'

/*
    section(class="container features features-light")
      div(class="content")
        h2(class="title") {{ appText.underDevelopment.title }}
        div(v-text-to-html.noAutoLink="appText.underDevelopment.body")

 */
export default {
  components: {
    EdEhrValues,
  },
  data () {
    return {
      appText,
    }
  },
}
</script>


<style lang="scss" scoped>
@import '../scss/definitions';
.container1 {
   background-image: url("../assets/bg.jpg");
}

</style>

