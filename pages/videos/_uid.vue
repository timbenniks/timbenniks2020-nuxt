<template>
  <div class="content-wrapper blogpost">
    <navigation />
    <main id="main-content">
      <div class="video-header">
        <p>
          If you like what you see, please
          <a
            href="https://www.youtube.com/timbenniks?sub_confirmation=1"
            target="_blank"
            rel="noopener"
            >subscribe</a
          >
          to my YouTube channel at
          <a
            href="https://www.youtube.com/timbenniks"
            target="_blank"
            rel="noopener"
            >youtube.com/timbenniks</a
          >!
        </p>

        <lite-youtube
          params="modestbranding=2&rel=0"
          :videoid="document.ytid"
          :play-label="document.title"
        >
        </lite-youtube>
      </div>
      <heading
        :title="document.title"
        :breadcrumb="true"
        titletag="h1"
        :use-fancy-titles="true"
      />
      <div class="filters no-count">
        <nuxt-link
          v-for="tag in document.tags"
          :key="tag"
          :to="`/videos/?facets=${tag.replace(/ /g, '-')}`"
          class="filter"
          >{{ tag }}</nuxt-link
        >
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div ref="body" class="post-content" v-html="document.content"></div>
      <!--eslint-enable-->
      <related-videos
        :related-videos="relatedVideos"
        :current-video="document.uid"
      />
    </main>
  </div>
</template>

<script>
import LinkMixin from '@/assets/mixins/linkMixin'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  mixins: [LinkMixin],
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-videos-uid" */ '@/datalayer/pages/videos/_uid'
    )
    const { document, relatedVideos, metaInfo } = await handler(context)
    return {
      document,
      relatedVideos,
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

lite-youtube {
  position: relative;
  display: block;
  contain: content;
  background-position: center center;
  background-size: cover;
}

lite-youtube::after {
  content: '';
  display: block;
  padding-bottom: calc(100% / (16 / 9));
}

lite-youtube > iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
}

lite-youtube > .lty-playbtn {
  width: 68px;
  height: 48px;
  position: absolute;
  cursor: pointer;
  transform: translate3d(-50%, -50%, 0);
  top: 50%;
  left: 50%;
  z-index: 1;
  background-color: transparent;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path d="M 45,24 27,14 27,34" fill="%23fff"></path></svg>');
  filter: grayscale(100%);
  transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1);
  border: none;
}

lite-youtube:hover > .lty-playbtn,
lite-youtube .lty-playbtn:focus {
  filter: none;
}

lite-youtube.lyt-activated {
  cursor: unset;
}
lite-youtube.lyt-activated::before,
lite-youtube.lyt-activated > .lty-playbtn {
  opacity: 0;
  pointer-events: none;
}

.lyt-visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
