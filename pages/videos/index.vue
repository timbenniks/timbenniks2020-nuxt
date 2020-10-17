<template>
  <div class="content-wrapper writings">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="$prismic.asText(document.data.title)"
        :uppercase="true"
      />

      <client-only>
        <ais-instant-search
          :routing="routing"
          :search-client="searchClient"
          index-name="VIDEOS"
        >
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
          <ais-stats :class-names="{ 'ais-Stats': 'videos-list' }" />
          <ais-infinite-hits>
            <div
              slot-scope="{ items, isLastPage, refineNext }"
              class="videos-list"
            >
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
        </ais-instant-search>
      </client-only>
    </main>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import {
  AisInstantSearch,
  AisRefinementList,
  AisInfiniteHits,
  AisStats,
} from 'vue-instantsearch'
import mapMetaInfo from '@/assets/prismic/mapMetaInfo'

export default {
  components: {
    AisInstantSearch,
    AisRefinementList,
    AisInfiniteHits,
    AisStats,
  },

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

  data() {
    return {
      searchClient: algoliasearch(
        this.$config.algolia_app_id,
        this.$config.algolia_api_key
      ),
    }
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
