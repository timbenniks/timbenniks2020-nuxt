<template>
  <div v-if="!$fetchState.pending && !$fetchState.error" class="content-wrapper blogpost">
    <navigation />
    <main id="main-content">
      <div class="video-header">
        <p>
          If you like what you see, please
          <a href="https://www.youtube.com/timbenniks?sub_confirmation=1" target="_blank" rel="noopener"
            >subscribe</a
          >
          to my YouTube channel at
          <a href="https://www.youtube.com/timbenniks" target="_blank" rel="noopener"
            >youtube.com/timbenniks</a
          >!
        </p>

        <lite-youtube params="modestbranding=2&rel=0" :videoid="cmsData.ytid" :play-label="cmsData.title" />
      </div>
      <heading :title="cmsData.title" :breadcrumb="true" titletag="h1" :use-fancy-titles="true" />
      <div class="filters no-count">
        <nuxt-link v-for="tag in cmsData.tags" :key="tag" :to="`/videos/tag/${cleanTag(tag)}`" class="filter">
          {{ tag }}
        </nuxt-link>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div v-interpolation class="post-content" v-html="cmsData.content" />
      <!--eslint-enable-->
      <related-videos :related-videos="relatedVideosData" :current-video="cmsData.uid" />
    </main>
  </div>
</template>

<script>
import { ref, useFetch, defineComponent, useMeta, useRoute } from '@nuxtjs/composition-api';

import { useContent } from '@/datalayer/pages/videos/_uid';
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo';

export default defineComponent({
  setup() {
    const cmsData = ref(null);
    const metaData = ref(null);
    const relatedVideosData = ref(null);

    const route = useRoute();

    useFetch(async () => {
      const { document, relatedVideos, metaInfo } = await useContent(route.value.params.uid);

      cmsData.value = document;
      relatedVideosData.value = relatedVideos;
      metaData.value = mapMetaInfo(metaInfo.fields, metaInfo.pageType, route.value.path);
    });

    useMeta(() => ({ ...metaData.value }));

    const cleanTag = (tag) => {
      const cleanedTag = tag.trim().replace(/ /g, '-');
      return encodeURIComponent(cleanedTag);
    };

    return { cmsData, relatedVideosData, metaData, cleanTag };
  },
  head: {},
});
</script>

<style lang="scss">
.blogpost .heading {
  margin: rem(0 auto 20px) !important;
  max-width: rem(800px);
}

.video-header {
  width: 100%;
  height: auto;
  max-width: rem(1440px);
  margin: 0 auto 3.75rem;
}

.post-content {
  max-width: rem(800px);
  margin: 3rem auto;

  p,
  li {
    line-height: 1.8;
    font-size: rem(18px);
    letter-spacing: 0.04em;
  }

  blockquote {
    border-left: 3px solid $blue-light;
    background: $blue-main;
    padding: rem(0 0 0 10px);

    p {
      font-size: rem(16px);
      font-style: italic;
    }
  }

  figure {
    margin: rem(0 0 32px);
    display: block;
    background: $blue-main;
    position: relative;
    border-bottom: 3px solid $blue-light;

    figcaption {
      position: absolute;
      bottom: 0;
      background: rgba($blue-main, 0.8);
      padding: rem(3px 7px);
      font-size: inherit;
      font-size: rem(16px);
    }
  }
}
</style>
