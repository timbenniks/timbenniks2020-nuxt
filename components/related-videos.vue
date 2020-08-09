<template>
  <div class="videos-list">
    <fancy-title
      tag="h3"
      field="Related Videos"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <ais-instant-search :search-client="searchClient" index-name="VIDEOS">
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

export default {
  name: 'RelatedVideos',
  components: {
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
      searchClient: algoliasearch(
        this.$config.algolia_app_id,
        this.$config.algolia_api_key
      ),
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
