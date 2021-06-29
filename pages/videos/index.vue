<template>
  <div
    v-if="!$fetchState.pending && !$fetchState.error"
    class="content-wrapper writings"
  >
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="cmsData.title"
        :uppercase="true"
      />

      <div class="filters no-count">
        <nuxt-link
          v-for="tag in tagsData"
          :key="tag"
          :to="`/videos/${tag.toLowerCase().replace(/ /g, '-')}`"
          class="filter"
          >{{ tag }}</nuxt-link
        >
      </div>

      <div class="videos-list">
        <div class="videos">
          <video-card
            v-for="video in videosData"
            :key="video.slug"
            :video="video"
          />
        </div>
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

import { useContent } from '@/datalayer/pages/videos'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default defineComponent({
  head: {},
  setup() {
    const cmsData = ref(null)
    const videosData = ref(null)
    const tagsData = ref(null)
    const metaData = ref(null)
    const route = useRoute()

    useFetch(async () => {
      const { document, videos, tags, metaInfo } = await useContent()

      cmsData.value = document
      videosData.value = videos
      tagsData.value = tags

      metaData.value = mapMetaInfo(
        metaInfo.fields,
        metaInfo.pageType,
        route.value.path
      )
    })

    useMeta(() => ({ ...metaData.value }))

    return { cmsData, videosData, tagsData, metaData }
  },
})
</script>

<style lang="scss" scoped>
.filters.no-count {
  max-width: 68.75rem;

  .filter {
    display: inline-block;
  }
}
</style>
