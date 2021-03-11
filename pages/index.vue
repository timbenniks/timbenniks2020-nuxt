<template>
  <div class="content-wrapper home">
    <main id="main-content" class="p-0 w-full mx-auto my-0 overflow-hidden">
      <home-hero-banner :data="heroBanner" />

      <div class="max-w-5xl px-8 my-12 mx-auto">
        <!--  eslint-disable vue/no-v-html-->
        <div
          class="homepage-introduction my-12 mx-auto max-w-3xl text-center"
          v-html="document.description"
        />
        <!--  eslint-enable-->

        <sponsor>
          <p class="text-sm">
            Why sponsor me? Visit the
            <nuxt-link to="/sponsor-me/"> sponsor me page</nuxt-link>
            to read more.
          </p>
        </sponsor>
        <home-top-videos :data="topVideos" />
        <!--
<home-latest-writing :data="latestWritings" /> -->
      </div>
    </main>
  </div>
</template>

<script>
import LinkMixin from '@/assets/mixins/linkMixin'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  mixins: [LinkMixin],
  async asyncData(context) {
    const { handler } = await import('@/datalayer/pages/home')
    const {
      document,
      heroBanner,
      topVideos,
      latestWritings,
      metaInfo,
    } = await handler(context)

    return {
      document,
      heroBanner,
      topVideos,
      latestWritings,
      metaInfo,
    }
  },
  head() {
    return mapMetaInfo(
      this.metaInfo.fields,
      this.metaInfo.pageType,
      this.$router.currentRoute.path
    )
  },
}
</script>

<style lang="postcss">
.home main {
  max-width: 90rem;
}

.homepage-introduction p {
  @apply m-0 text-xl m:text-2xl;
}

.homepage-introduction p a {
  @apply text-blue-light underline;
}
</style>
