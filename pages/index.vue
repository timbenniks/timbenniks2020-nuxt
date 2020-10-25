<template>
  <div class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <home-hero-banner :data="heroBanner" />

      <div class="homepage-content">
        <!-- eslint-disable vue/no-v-html -->
        <div class="homepage-introduction" v-html="document.description" />
        <!--eslint-enable-->

        <sponsor>
          <p @click="$ga.event('sponsor', 'click', 'homepage', 'label')">
            Why sponsor me? Visit the
            <nuxt-link to="/sponsor-me/"> sponsor me page</nuxt-link>
            to read more.
          </p>
        </sponsor>

        <home-top-videos :data="topVideos" />
        <home-latest-writing :data="latestWritings" />
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

<style lang="scss">
.home {
  main {
    padding: 0;
    max-width: rem(1440px);
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .homepage-content {
    max-width: rem(1100px);
    padding: rem(0 16px);
    margin: rem(30px auto);

    .homepage-introduction {
      margin: 3rem auto;
      max-width: rem(800px);
      text-align: center;

      p {
        margin: 0;
        // prettier-ignore
        @include responsive('font-size', ( xs: rem(18px), m: rem(24px) ));
      }
    }
  }
}
</style>
