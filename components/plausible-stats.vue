<template>
  <div class="stats">
    <fancy-title
      field="Plausible"
      tag="h1"
      color="blue-dark"
      type="small"
      :offset="[0, 0]"
      :uppercase="true"
    />
    <div class="stats-wrap">
      <div class="stat">
        <h6>BOUNCE RATE</h6>
        <p>{{ plausibleStats.bounce_rate.value }}%</p>
        <!-- <p class="trend">{{ plausibleStats.bounce_rate.change }}%</p> -->
      </div>
      <div class="stat">
        <h6>VISITORS</h6>
        <p>
          {{ plausibleStats.visitors.value }}
        </p>
        <!-- <p class="trend">{{ plausibleStats.visitors.change }}%</p> -->
      </div>
      <div class="stat">
        <h6>PAGEVIEWS</h6>
        <p>
          {{ plausibleStats.pageviews.value }}
        </p>
        <!-- <p class="trend">{{ plausibleStats.pageviews.change }}%</p> -->
      </div>
    </div>
    <p class="quick-links">
      Go to:
      <a href="https://plausible.io/timbenniks.dev" target="_blank"
        >Dashboard</a
      >
    </p>
  </div>
</template>

<script>
import FancyTitle from './fancy-title.vue'

export default {
  name: 'PlausibleStats',
  components: {
    FancyTitle,
  },
  computed: {
    plausibleStats() {
      return this.$store.getters['store/plausibleStats']
    },
  },
  mounted() {
    this.$store.dispatch('store/getPlausibleStats')
  },
}
</script>
