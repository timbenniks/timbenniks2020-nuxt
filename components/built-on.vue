<template>
  <div class="built-on">
    <a
      href="https://vercel.com"
      rel="noopener"
      target="_blank"
      aria-label="go to vercel"
    >
      <iconVercel alt="Vercel" />
    </a>
    <a
      href="https://nuxtjs.org"
      rel="noopener"
      target="_blank"
      aria-label="go to nuxt"
    >
      <iconWithNuxt alt="Nuxt" />
    </a>
  </div>
</template>

<script>
import iconVercel from './iconVercel.vue'
import iconWithNuxt from './iconWithNuxt.vue'

export default {
  components: {
    iconWithNuxt,
    iconVercel,
  },
}
</script>
<style lang="scss">
// .built-on {
//   max-width: 280px;
//   width: 100%;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;

//   svg {
//     border: 2px solid rgba(255, 255, 255, 0.7);
//     border-radius: rem(5px);
//     height: rem(35px);
//   }
// }
</style>
