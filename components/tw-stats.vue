<template>
  <div class="stats twitter">
    <fancy-title
      field="Twitter Stats"
      tag="h1"
      color="blue-dark"
      type="small"
      :offset="[0, 0]"
      :uppercase="true"
    />
    <div class="stats-wrap">
      <div class="stat">
        <h6>TWEETS</h6>
        <!-- <p v-if="twitterStats.tweets">
          {{ twitterStats.tweets.amount }}
        </p>
        <p class="trend" :class="`trend-${twitterStats.tweets.direction}`">
          {{ twitterStats.tweets.trend }}
        </p>
      </div>
      <div class="stat">
        <h6>IMPRESSIONS</h6>
        <p v-if="twitterStats.impressions">
          {{ twitterStats.impressions.amount }}
        </p>
        <p class="trend" :class="`trend-${twitterStats.impressions.direction}`">
          {{ twitterStats.impressions.trend }}
        </p>
      </div>
      <div class="stat">
        <h6>PROFILE VISITS</h6>
        <p v-if="twitterStats.profileVisits">
          {{ twitterStats.profileVisits.amount }}
        </p>
        <p
          class="trend"
          :class="`trend-${twitterStats.profileVisits.direction}`"
        >
          {{ twitterStats.profileVisits.trend }}
        </p>
      </div>
      <div class="stat">
        <h6>MENTIONS</h6>
        <p v-if="twitterStats.mentions">
          {{ twitterStats.mentions.amount }}
        </p>
        <p class="trend" :class="`trend-${twitterStats.mentions.direction}`">
          {{ twitterStats.mentions.trend }}
        </p>
      </div>
      <div class="stat">
        <h6>FOLLOWERS</h6>
        <p v-if="twitterStats.followers">
          {{ twitterStats.followers.amount }}
        </p>
        <p class="trend" :class="`trend-${twitterStats.followers.direction}`">
          {{ twitterStats.followers.trend }}
        </p> -->
      </div>
    </div>
    <p class="quick-links">
      Go to:
      <a href="https://twitter.com/timbenniks/" target="blank">Profile</a>,
      <a href="https://analytics.twitter.com" target="blank">Analytics</a>.
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FancyTitle from './fancy-title.vue'

export default {
  name: 'TwStats',
  components: {
    FancyTitle,
  },
  // computed: mapGetters(['twitterStats']),
  mounted() {
    console.log(this.$store)
    this.getTwitterStats()
  },
  methods: {
    ...mapActions(['getTwitterStats']),
  },
}
</script>
