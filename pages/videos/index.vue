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

      <div class="filters">
        <button
          v-for="facet in facets"
          :key="facet.label"
          class="filter"
          :class="{ selected: facet.active, disabled: facet.amount === 0 }"
          @click.prevent="
            refine(facet)
            $ga.event('video-facet', 'click', facet.label)
          "
        >
          {{ facet.label }}
          <span>{{ facet.amount }}</span>
        </button>
      </div>

      <div class="videos-list">
        <div class="videos">
          <video-card v-for="hit in hits" :key="hit.slug" :video="hit" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '@/assets/prismic/mapMetaInfo'
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $prismic, error }) {
    try {
      const vids = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'video'),
        { orderings: '[my.video.publication_date desc]', pageSize: 100 }
      )

      const tagsHolder = []
      vids.results.forEach((result) => {
        result.tags.forEach((tag) => {
          tagsHolder.push(tag)
        })
      })

      const tags = [...new Set(tagsHolder)]
      const document = await $prismic.api.getSingle('youtube')

      return {
        document,
        tags,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  computed: {
    ...mapGetters({
      hits: 'store/searchResults',
      facets: 'store/facets',
    }),
  },

  created() {
    this.$store.dispatch('store/getPrismicTags', this.tags)
    this.$store.dispatch('store/searchAlgolia')
  },

  methods: {
    refine(facet) {
      let query = facet.label

      this.facets
        .filter((facet) => facet.active)
        .forEach((facet) => {
          query += `, ${facet.label}`
        })

      this.$store.dispatch('store/searchAlgolia', query)
    },
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
