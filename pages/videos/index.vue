<template>
  <div class="content-wrapper writings">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        title="Videos"
        :uppercase="true"
      />

      <ais-instant-search-ssr>
        <ais-refinement-list
          attribute="tags"
          operator="or"
          :sort-by="['name:asc']"
        >
          <div slot-scope="{ items, refine }" class="filters">
            <button
              v-for="item in items"
              :key="item.value"
              :class="{ selected: item.isRefined }"
              class="filter"
              @click.prevent="refine(item.value)"
            >
              {{ item.label }}
              <span>{{ item.count.toLocaleString() }}</span>
            </button>
          </div>
        </ais-refinement-list>
        <ais-stats :class-names="{ 'ais-Stats': 'posts' }" />
        <ais-infinite-hits>
          <div slot-scope="{ items, isLastPage, refineNext }" class="posts">
            <div class="videos">
              <video-card
                v-for="item in items"
                :key="item.slug"
                :video="item"
              />
            </div>
            <button v-if="!isLastPage" class="load-more" @click="refineNext">
              Load More Results
            </button>
          </div>
        </ais-infinite-hits>
      </ais-instant-search-ssr>
    </main>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch'
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisInfiniteHits,
  AisStats,
  createServerRootMixin,
} from 'vue-instantsearch'
import mapMetaInfo from '@/assets/prismic/mapMetaInfo'

export default {
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisInfiniteHits,
    AisStats,
  },

  mixins: [
    createServerRootMixin({
      searchClient: algoliasearch(
        'LTRZ8EDRZF',
        'b026a037e416510c0af71195118d465c'
      ),
      indexName: 'VIDEOS',
    }),
  ],

  async asyncData({ $prismic, error }) {
    try {
      const document = await $prismic.api.getSingle('youtube')
      return {
        document,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      this.$ssrContext.nuxt.algoliaState = algoliaState
    })
  },

  beforeMount() {
    const results = window.__NUXT__.algoliaState
    this.instantsearch.hydrate(results)
  },

  head() {
    return mapMetaInfo(this.document.data, 'videos', this.$router.currentRoute)
  },
}
</script>

<style lang="scss" scoped>
.videos {
  display: grid;
  grid-gap: 1rem;
  min-width: 0;

  // prettier-ignore
  @include responsive('grid-template-columns', (xs: 100%, sm: repeat(2, 47.5%), m: repeat(3, 32%)));
}
</style>
