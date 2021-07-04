<template>
  <div
    v-if="!$fetchState.pending && !$fetchState.error"
    class="content-wrapper blogpost"
  >
    <navigation />

    <main id="main-content">
      <heading
        :title="cmsData.title"
        :breadcrumb="true"
        titletag="h1"
        :use-fancy-titles="true"
      />

      <div class="sponsor-wrapper">
        <sponsor alignment="left">
          <p>
            Click the button above to sponsor me or visit my
            <a
              href="https://www.buymeacoffee.com/timbenniks"
              target="_blank"
              rel="noopener"
              >buymeacoffee</a
            >
            page.
          </p>
        </sponsor>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div v-interpolation class="post-content" v-html="cmsData.content" />
      <!--eslint-enable-->
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

import { useContent } from '@/datalayer/pages/sponsor-me'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default defineComponent({
  setup() {
    const cmsData = ref(null)
    const metaData = ref(null)
    const route = useRoute()

    useFetch(async () => {
      const { document, metaInfo } = await useContent()

      cmsData.value = document

      metaData.value = mapMetaInfo(
        metaInfo.fields,
        metaInfo.pageType,
        route.value.path
      )
    })

    useMeta(() => ({ ...metaData.value }))

    return { cmsData, metaData }
  },
  head: {},
})
</script>

<style lang="scss">
.blogpost .heading {
  margin: rem(0 auto 20px) !important;
  max-width: rem(800px);

  h1,
  h2 {
    line-height: 1.2;
  }
}

.sponsor-wrapper {
  margin: 3rem auto;
  max-width: rem(800px);
}

.post-content {
  margin: 3rem auto 2rem;
  max-width: rem(800px);

  p,
  li {
    font-size: rem(18px);
    letter-spacing: 0.04em;
    line-height: 1.8;
  }

  blockquote {
    background: $blue-main;
    border-left: 3px solid $blue-light;
    padding: rem(0 0 0 10px);

    p {
      font-size: rem(16px);
      font-style: italic;
    }
  }

  figure {
    background: $blue-main;
    border-bottom: 3px solid $blue-light;
    display: block;
    margin: rem(0 0 32px);
    position: relative;

    figcaption {
      background: rgba($blue-main, 0.8);
      bottom: 0;
      font-size: inherit;
      font-size: rem(16px);
      padding: rem(3px 7px);
      position: absolute;
    }
  }
}
</style>
