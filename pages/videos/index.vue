<template>
  <div class="content-wrapper writings">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="document.title"
        :uppercase="true"
      />

      <div class="videos-list">
        <div class="videos">
          <video-card
            v-for="video in videos"
            :key="video.slug"
            :video="video"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  async asyncData(context) {
    const { handler } = await import('@/datalayer/pages/videos')
    const { document, videos, tags, metaInfo } = await handler(context)
    return {
      videos,
      document,
      tags,
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

<style lang="scss" scoped>
.status {
  max-width: 1100px;
  margin: 0 auto 1.25rem;

  .filter {
    margin: 0;
  }
}
</style>
