<template>
  <div class="content-wrapper speaking">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="document.title"
        :uppercase="true"
      />

      <h3 class="post-title-sep">
        {{ document.upcoming_talks }}
      </h3>

      <div v-if="upcomingTalks.length > 0" class="posts">
        <talk v-for="talk in upcomingTalks" :key="talk.uid" :talk="talk" />
      </div>

      <p v-else class="no-upcoming-talks">
        {{ document.no_upcoming }}
      </p>

      <h3 class="post-title-sep">
        {{ document.older_talks }}
      </h3>

      <div class="posts">
        <talk v-for="talk in oldTalks" :key="talk.uid" :talk="talk" />
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-speaking" */ '@/datalayer/pages/speaking'
    )
    const { document, oldTalks, upcomingTalks, metaInfo } = await handler(
      context
    )

    return {
      document,
      oldTalks,
      upcomingTalks,
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
.heading,
.posts,
.post-title-sep,
.no-upcoming-talks {
  margin: 0 auto 2rem;
  max-width: rem(800px);
}

.no-upcoming-talks {
  margin: rem(0 auto 40px);
}

.post-title {
  margin: rem(0 0 6px 0);
}
</style>
