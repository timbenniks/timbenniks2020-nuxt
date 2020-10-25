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

        <figure class="youtube" style="--aspect-ratio: 16/9;">
          <iframe
            width="16"
            height="9"
            allowfullscreen
            frameborder="0"
            :data-src="document.embed"
          ></iframe>
        </figure>
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
import IframeMixin from '@/assets/mixins/iframeMixin'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  mixins: [LinkMixin, IframeMixin],
  async asyncData(context) {
    const { handler } = await import('@/datalayer/pages/videos/_uid')
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
</style>
