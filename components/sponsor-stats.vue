<template>
  <div class="stats">
    <fancy-title
      field="Sponsor Stats"
      tag="h1"
      color="blue-dark"
      type="small"
      :offset="[0, 0]"
      :uppercase="true"
    />
    <div class="stats-wrap">
      <div class="stat">
        <h6>SUPPORTERS</h6>
        <p>{{ sponsorStats.supporterCount }}</p>
      </div>
      <div class="stat">
        <h6>SUBSCRIBERS</h6>
        <p>{{ sponsorStats.subscriberCount }}</p>
      </div>
      <div class="stat">
        <h6>EARNINGS</h6>
        <p>&euro;{{ sponsorStats.supporterEarnings }}</p>
      </div>
    </div>
    <p class="quick-links">
      Go to:
      <a href="https://www.buymeacoffee.com/timbenniks/" target="blank"
        >Profile</a
      >,
      <a href="https://www.buymeacoffee.com/dashboard/" target="blank"
        >Dashboard</a
      >,
      <a href="https://www.paypal.com/myaccount/summary" target="blank"
        >Paypal</a
      >.
    </p>
  </div>
</template>

<script>
import FancyTitle from './fancy-title.vue'

export default {
  name: 'SponsorStats',
  components: {
    FancyTitle,
  },
  computed: {
    sponsorStats() {
      return this.$store.getters['store/sponsorStats']
    },
  },
  mounted() {
    this.$store.dispatch('store/getSponsorStats')
  },
}
</script>
