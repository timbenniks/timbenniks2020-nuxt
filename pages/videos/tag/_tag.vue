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
        :title="titleData"
        :uppercase="true"
      />

      <div class="filters no-count">
        <nuxt-link
          v-for="tag in tagsData"
          :key="tag"
          :to="`/videos/tag/${cleanTag(tag)}`"
          class="filter"
          :class="{ selected: tag === urlTag }"
        >
          {{ tag }}
        </nuxt-link>
      </div>

      <div v-if="noTagSelected" class="videos-list">
        No tag selected. Please select one to see related videos.
      </div>

      <div v-else class="videos-list">
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

import { useContent } from '@/datalayer/pages/videos/_tag'

export default defineComponent({
  setup() {
    const route = useRoute()

    const videosData = ref(null)
    const tagsData = ref(null)
    const titleData = ref(null)
    const urlTag = ref('')
    const noTagSelected = ref(false)

    useFetch(async () => {
      const { videos, tags, tag, title } = await useContent(
        route.value.params.tag
      )

      videosData.value = videos
      tagsData.value = tags
      titleData.value = title
      urlTag.value = tag

      if (videos.length === 0) {
        noTagSelected.value = true
      }
    })

    useMeta({ title: titleData })

    const cleanTag = (tag) => {
      if (tag) {
        const cleanedTag = tag.trim().replace(/ /g, '-')
        return encodeURIComponent(cleanedTag)
      } else {
        return ''
      }
    }

    return { videosData, tagsData, titleData, urlTag, cleanTag, noTagSelected }
  },
  head: {},
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
