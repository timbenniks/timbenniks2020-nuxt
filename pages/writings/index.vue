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

      <div class="posts">
        <article v-for="post in writingsData" :key="post.uid" class="post">
          <nuxt-link :to="`/writings/${post.uid}/`">
            <lazy-img
              ratio="16/9"
              :alt="post.title"
              :url="post.image"
              :caption="false"
              sizes="sm:100vw md:320px"
            />
          </nuxt-link>

          <div class="post-content-wrapper">
            <p class="post-title fancy-title red">
              <nuxt-link :to="`/writings/${post.uid}/`">
                {{ post.title }}
              </nuxt-link>
            </p>
            <p class="post-description">
              <span class="post-date">
                {{ post.day }}
                {{ post.month }}
                {{ post.year }}
              </span>
              &mdash; {{ post.sub_title }}
            </p>
          </div>
        </article>
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

import { useContent } from '@/datalayer/pages/writings'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default defineComponent({
  head: {},
  setup() {
    const cmsData = ref(null)
    const writingsData = ref(null)
    const metaData = ref(null)
    const route = useRoute()

    useFetch(async () => {
      const { document, writings, metaInfo } = await useContent()

      cmsData.value = document
      writingsData.value = writings

      metaData.value = mapMetaInfo(
        metaInfo.fields,
        metaInfo.pageType,
        route.value.path
      )
    })

    useMeta(() => ({ ...metaData.value }))

    return { cmsData, writingsData, metaData }
  },
})
</script>

<style lang="scss" scoped>
.post-date {
  float: none;
  font-weight: 400;
  margin: 0;
}
</style>
