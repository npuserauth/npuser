<template lang="pug">
  div(class="homePage")
    div(id="intro", class="mypage")
      div(class="mycontainer container1")
        div(class="mycontent mt-4 hero")
          h1(class="text-center", v-text-to-html="appText.hero.title")
          h2(class="text-center") {{appText.hero.subTitle}}
          div(class="d-flex justify-center mt-10")
            div(class="font-weight-bold ", v-text-to-html="appText.hero.body")

    div(id="npuser-values", class="mypage")
      div(class="middle")
        v-row(v-for="(m, index) in appText.npKeyValues", :key="index", justify="space-around")
          v-card(class="myCard")
            v-card-title {{m.title}}
            v-card-text(class="mycardtext", v-text-to-html="m.body")

    div(id="npuser-how", class="mypage")
      div(class="middle")
        h1(class="text-center", v-text-to-html="appText.alternatives.title")
        v-row(v-for="(m, index) in appText.npuserHow", :key="index", justify="space-around")
          v-card(class="myCard")
            v-card-title {{m.title}}
            div(v-if="m.imgSrc", class="my-card-image-wrapper")
              v-img(:src="require(`../assets/${m.imgSrc}`)", :alt="m.imgAlt", contain, height="400px", width="600px")
            v-card-text(class="mycardtext", v-text-to-html="m.body")

    div(id="alternatives", class="mypage")
      div(class="middle")
        h1(class="text-center", v-text-to-html="appText.alternatives.title")
        v-row(justify="space-around")
          p() {{appText.alternatives.intro}}
          div
            v-img(src="../assets/SSO.png", alt="SSO", width="600px")
        v-row(v-for="(m, index) in appText.sso.ssoWeakness", :key="index", justify="space-around")
          v-card(class="myCard")
            v-card-text(class="mycardtext", v-text-to-html="m")

    div(id="start", class="mypage")
      div(class="middle")
        h1(class="text-center") PLACEHOLDER
        h2(class="text-center") Come back soon to see this section evolve
        v-row(justify="space-around")
          div
            v-img(src="../assets/passwords.png", alt="SSO", width="600px")
        v-row(v-for="(m, index) in appText.sso.ssoWeakness", :key="index", justify="space-around")
          v-card(class="myCard")
            v-card-text(class="mycardtext", v-text-to-html="m")
</template>

<!--
The scroll to hash depends on the scrollBehavior inside router.ts
-->


<script>
  import { appText } from '@/appText'

  export default {
    data: () => ({
      appText,
    }),
  }
</script>

<style scoped lang="scss">

  .hero {
    font-size: 1.3rem;
  }

  .mycardtext {
    font-size: 1.15rem;
  }

  .my-card-image-wrapper {
    display: flex;
    justify-content: center;
  }
  .mypage {
    /*font-family: "Avenir Next", "Avenir", sans-serif !important;*/
    position: relative;
    padding: 0;
    margin: 0 10px 0 10px;
  }

  .mypage:nth-child(even) {background: #CCC}

  .mycontent {
    position: absolute;
    border: none;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0;
    margin: 0;
    overflow: auto;
  }

  .mycontainer {
    /* parallax scrolling effect */
    height: 100vh;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: grey;
  }

  .mycontainer:before {
    content: "";
    position: absolute;
    border: none;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0;
    margin: 0;
    background: #eee;
    opacity: 0.4;
  }

  .middle {
  }

  .myCard {
    background-color: rgba(255, 255, 255, 0.4) !important;
    margin: 2rem 0 1rem 0;
    padding: 1rem;
    width: 50rem;
    box-shadow: 0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)!important;
  }
  .myCard:hover {
    box-shadow: 0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)!important;
  }

  .mycontent {
    color: #22262e;
  }


.container1 {
  background-image: url("https://images.unsplash.com/photo-1587321081101-3fa677fa4683");
}

.container3 {
  background-image: url("../assets/bg.jpg");
}

.container3:before {
  /* make this overlay denser because the bg image is busy */
  opacity: 0.8 !important;
}

.container4 {
  background-image: url("https://images.unsplash.com/photo-1565527891925-f773aae06005");
}


</style>
