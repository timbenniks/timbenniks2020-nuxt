<template>
  <div
    v-if="!$fetchState.pending && !$fetchState.error"
    class="content-wrapper home"
  >
    <navigation />

    <main id="main-content">
      <home-hero-banner :data="heroBannerData" />

      <div class="homepage-content">
        <!-- eslint-disable vue/no-v-html -->
        <div
          v-interpolation
          class="homepage-introduction"
          v-html="cmsData.description"
        />
        <!--eslint-enable-->

        <sponsor>
          <p>
            Why sponsor me? Visit the
            <nuxt-link to="/sponsor-me/"> sponsor me page</nuxt-link>
            to read more.
          </p>
        </sponsor>

        <home-top-videos :data="topVideosData" />
        <home-latest-writing :data="latestWritingsData" />
      </div>
    </main>
  </div>
</template>

<script>
import {
  ref,
  useFetch,
  defineComponent,
  useMeta,
  useRoute,
} from '@nuxtjs/composition-api'

import { useContent } from '@/datalayer/pages/home'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default defineComponent({
  head: {},
  setup() {
    const cmsData = ref(null)
    const heroBannerData = ref(null)
    const topVideosData = ref(null)
    const latestWritingsData = ref(null)
    const metaData = ref(null)
    const route = useRoute()

    useFetch(async () => {
      const { document, heroBanner, topVideos, latestWritings, metaInfo } =
        await useContent()

      cmsData.value = document
      heroBannerData.value = heroBanner
      topVideosData.value = topVideos
      latestWritingsData.value = latestWritings

      metaData.value = mapMetaInfo(
        metaInfo.fields,
        metaInfo.pageType,
        route.value.path
      )
    })

    useMeta(() => ({ ...metaData.value }))

    return {
      cmsData,
      heroBannerData,
      topVideosData,
      latestWritingsData,
      metaData,
    }
  },
})
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
