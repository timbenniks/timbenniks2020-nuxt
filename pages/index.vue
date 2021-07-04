<template>
  <div v-if="!$fetchState.pending && !$fetchState.error" class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <home-hero-banner :data="heroBannerData" />

      <div class="homepage-content">
        <!-- eslint-disable vue/no-v-html -->
        <div v-interpolation class="homepage-introduction" v-html="cmsData.description" />
        <!--eslint-enable-->

        <home-top-videos
          :title="topVideosData.title"
          :intro="topVideosData.intro"
          :videos="topVideosData.videos"
        />
        <home-latest-writing :writings="latestWritingsData" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { ref, useFetch, defineComponent, useMeta, useRoute } from '@nuxtjs/composition-api';

import { useContent } from '@/datalayer/pages/home';
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo';

export default defineComponent({
  setup() {
    const cmsData = ref({});
    const heroBannerData = ref({});
    const topVideosData = ref({});
    const latestWritingsData = ref({});
    const metaData = ref({});
    const route = useRoute();

    useFetch(async () => {
      const { document, heroBanner, topVideos, latestWritings, metaInfo } = await useContent();

      cmsData.value = document;
      heroBannerData.value = heroBanner;
      topVideosData.value = topVideos;
      latestWritingsData.value = latestWritings;

      metaData.value = mapMetaInfo(metaInfo.fields, metaInfo.pageType, route.value.path);
    });

    useMeta(() => ({ ...metaData.value }));

    return {
      cmsData,
      heroBannerData,
      topVideosData,
      latestWritingsData,
      metaData,
    };
  },
  head: {},
});
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

    // prettier-ignore
    @include responsive('margin', ( xs: 1rem auto, m: 30px auto ));

    .homepage-introduction {
      // prettier-ignore
      @include responsive('margin', ( xs: 0 auto 3rem, m: 3rem auto 5rem ));

      // prettier-ignore
      @include responsive('width', ( xs: 90%, m: 100% ));

      max-width: rem(800px);
      text-align: center;

      p {
        margin: 0;
        // prettier-ignore
        @include responsive('font-size', ( xs: rem(16px), m: rem(24px) ));
      }
    }
  }
}
</style>
