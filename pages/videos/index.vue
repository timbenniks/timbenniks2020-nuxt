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

      <div class="filters">
        <button
          v-for="facet in facets"
          :key="facet.label"
          class="filter"
          :class="{ selected: facet.active, disabled: facet.amount === 0 }"
          @click.prevent="refine(facet, facet.active)"
        >
          {{ facet.label }}
          <span>{{ facet.amount }}</span>
        </button>
      </div>

      <p class="status">
        <template v-if="loading">
          Working...
        </template>
        <template v-else>
          <span v-if="results !== 0">
            {{ results }} Result<template v-if="results !== 1">s</template>
            <button v-if="query" class="filter" @click="clearFilters">
              clear filters
              <span>x</span>
            </button>
          </span>
        </template>
      </p>

      <div class="videos-list">
        <div class="videos">
          <video-card v-for="hit in hits" :key="hit.slug" :video="hit" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'
import { mapGetters } from 'vuex'

export default {
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-videos" */ '@/datalayer/pages/videos'
    )
    const { document, tags, metaInfo } = await handler(context)
    return {
      document,
      tags,
      metaInfo,
    }
  },

  computed: {
    ...mapGetters({
      hits: 'store/searchHits',
      facets: 'store/facets',
      loading: 'store/searchLoading',
      results: 'store/searchResults',
      query: 'store/searchQuery',
    }),
  },

  created() {
    this.$store.dispatch('store/getPrismicTags', this.tags)
  },

  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const facets = urlParams.get('facets')
    if (facets) {
      this.$store.dispatch(
        'store/searchAlgolia',
        this.cleanUrlParams(facets, true)
      )
    } else {
      this.$store.dispatch('store/searchAlgolia')
    }
  },

  methods: {
    refine(clickedFacet, active) {
      let query = ''

      if (!active) {
        query = clickedFacet.label
      }

      this.facets
        .filter((facet) => facet.active)
        .forEach((facet) => {
          if (facet.label !== clickedFacet.label) {
            query += `,${facet.label}`
          }
        })

      if (query.startsWith(',')) {
        query = query.substring(1)
      }

      this.pushUrl(`?facets=${this.cleanUrlParams(query)}`)
      this.$store.dispatch('store/searchAlgolia', query)
      this.$ga.event('video-facet', 'click', clickedFacet.label)
    },

    cleanUrlParams(query, reverse = false) {
      return reverse ? query.replace(/-/g, ' ') : query.replace(/ /g, '-')
    },

    clearFilters() {
      this.pushUrl('/videos/')
      this.$store.dispatch('store/searchAlgolia')
      this.$ga.event('video-facet', 'clear-filters')
    },

    pushUrl(params) {
      window.history.pushState({}, 'Videos - Tim Benniks', `${params}`)
    },
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
