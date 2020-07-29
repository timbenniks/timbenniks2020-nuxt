<template>
  <div class="related-videos">
    <fancy-title
      tag="h3"
      field="Related Videos"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <ais-instant-search
      :search-client="searchClient"
      :index-name="$algolia.index"
    >
      <ais-configure :hits-per-page.camel="3">
        <ais-experimental-configure-related-items
          :hit="hit"
          :matching-patterns="matchingPatterns"
        />
        <ais-hits>
          <div slot-scope="{ items }" class="posts">
            <div class="videos">
              <video-card
                v-for="item in items"
                :key="item.slug"
                :video="item"
              />
            </div>
          </div>
        </ais-hits>
      </ais-configure>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch'
import {
  AisInstantSearch,
  AisExperimentalConfigureRelatedItems,
  AisHits,
  AisConfigure,
} from 'vue-instantsearch'
import VideoCard from './video-card.vue'
import FancyTitle from './fancy-title.vue'

export default {
  name: 'RelatedVideos',
  components: {
    VideoCard,
    FancyTitle,
    AisInstantSearch,
    AisExperimentalConfigureRelatedItems,
    AisHits,
    AisConfigure,
  },
  props: {
    video: { type: Object, required: true },
  },
  data() {
    return {
      hit: null,
      matchingPatterns: {
        tags: { score: 3 },
      },
      searchClient: algoliasearch(this.$algolia.appId, this.$algolia.apiKey),
    }
  },
  created() {
    this.hit = {
      objectID: this.video.uid,
      tags: this.video.tags,
    }
  },
}
</script>

<style lang="scss" scoped>
.related-videos {
  margin: 0 auto;
  max-width: rem(800px);

  .fancy-title {
    margin: rem(0 0 30px 0);
  }

  .videos {
    // prettier-ignore
    @include responsive('grid-template-columns', (xs: 100%, sm: repeat(2, 47.5%), m: repeat(3, 32%)));

    display: grid;
    grid-gap: 1rem;
    min-width: 0;
  }
}
</style>
