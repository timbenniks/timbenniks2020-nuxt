<template>
  <div class="stats">
    <fancy-title
      field="YouTube Stats"
      tag="h1"
      color="blue-dark"
      type="small"
      :offset="[0, 0]"
      :uppercase="true"
    />
    <div class="stats-wrap">
      <div class="stat">
        <h6>SUBSCRIBERS</h6>
        <p>{{ youTubeStats.subscriberCount }}</p>
      </div>
      <div class="stat">
        <h6>VIEWS</h6>
        <p>{{ youTubeStats.viewCount }}</p>
      </div>
      <div class="stat">
        <h6>VIDEOS</h6>
        <p>{{ youTubeStats.videoCount }}</p>
      </div>
    </div>
    <p class="quick-links">
      Go to: <a href="https://studio.youtube.com/" target="_blank">Studio</a>,
      <a href="https://youtube.com/timbenniks" target="_blank">Channel</a>,
      <a href="https://trello.com/b/YsxqLr2C/youtube" target="_blank">Trello</a
      >, <a href="https://notion.so" target="_blank">Notion</a>.
    </p>
  </div>
</template>

<script>
import FancyTitle from './fancy-title.vue'

export default {
  name: 'YtStats',
  components: {
    FancyTitle,
  },
  computed: {
    youTubeStats() {
      return this.$store.getters['store/youTubeStats']
    },
  },
  mounted() {
    this.$store.dispatch('store/getYouTubeStats')
  },
}
</script>
