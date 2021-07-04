<template>
  <div
    v-if="!$fetchState.pending && !$fetchState.error"
    class="content-wrapper speaking"
  >
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="cmsData.title"
        :uppercase="true"
      />

      <h3 class="post-title-sep">
        {{ cmsData.upcoming_talks }}
      </h3>

      <div v-if="upcomingTalksData.length > 0" class="posts">
        <talk v-for="talk in upcomingTalksData" :key="talk.uid" :talk="talk" />
      </div>

      <p v-else class="no-upcoming-talks">
        {{ cmsData.no_upcoming }}
      </p>

      <h3 class="post-title-sep">
        {{ cmsData.older_talks }}
      </h3>

      <div class="posts">
        <talk v-for="talk in oldTalksData" :key="talk.uid" :talk="talk" />
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

import { useContent } from '@/datalayer/pages/speaking'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default defineComponent({
  setup() {
    const cmsData = ref(null)
    const oldTalksData = ref(null)
    const upcomingTalksData = ref(null)
    const metaData = ref(null)
    const route = useRoute()

    useFetch(async () => {
      const { document, oldTalks, upcomingTalks, metaInfo } = await useContent()

      cmsData.value = document
      oldTalksData.value = oldTalks
      upcomingTalksData.value = upcomingTalks

      metaData.value = mapMetaInfo(
        metaInfo.fields,
        metaInfo.pageType,
        route.value.path
      )
    })

    useMeta(() => ({ ...metaData.value }))

    return {
      cmsData,
      oldTalksData,
      upcomingTalksData,
      metaData,
    }
  },
  head: {},
})
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
