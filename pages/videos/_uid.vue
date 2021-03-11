<template>
  <div class="content-wrapper blogpost">
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
