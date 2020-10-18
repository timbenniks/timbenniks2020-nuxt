export const state = () => ({
  youTubeStats: {
    subscriberCount: 0,
    viewCount: 0,
    videoCount: 0,
  },
  twitterStats: {
    tweets: {
      amount: 0,
      direction: null,
      trend: 0,
    },
    impressions: {
      amount: 0,
      direction: null,
      trend: 0,
    },
    profileVisits: {
      amount: 0,
      direction: null,
      trend: 0,
    },
    mentions: {
      amount: 0,
      direction: null,
      trend: 0,
    },
    followers: {
      amount: 0,
      direction: null,
      trend: 0,
    },
  },
  sponsorStats: {
    supporters: [],
    subscriptions: [],
    sponsorCount: 0,
    subscriberCount: 0,
    supporterCount: 0,
    supporterEarnings: 0,
  },
})

export const mutations = {
  setYouTubeStats(state, stats) {
    state.youTubeStats = stats.channelStats
  },

  setTwitterStats(state, stats) {
    state.twitterStats = {
      ...stats.summary,
    }
  },

  setSponsorStats(state, stats) {
    let supporterEarnings = 0

    stats.supporters.forEach((supporter) => {
      supporterEarnings +=
        Number(supporter.support_coffees) *
        Number(supporter.support_coffee_price)
    })

    stats.subscriptions.forEach((subscription) => {
      supporterEarnings += Number(subscription.subscription_coffee_price)
    })

    state.sponsorStats = {
      supporters: stats.supporters,
      subscriptions: stats.subscriptions,
      sponsorCount: stats.supporters.length + stats.subscriptions.length,
      supporterEarnings,
      subscriberCount: stats.subscriptions.length,
      supporterCount: stats.supporters.length,
    }
  },
}

export const getters = {
  youTubeStats(state) {
    return state.youTubeStats
  },

  twitterStats(state) {
    return state.twitterStats
  },

  sponsorStats(state) {
    return state.sponsorStats
  },
}

export const actions = {
  getYouTubeStats({ commit }) {
    fetch(`${this.$config.base_url}api/youtube-stats`, {
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((stats) => commit('setYouTubeStats', stats))
      .catch(console.error)
  },

  getTwitterStats({ commit }) {
    fetch(`${this.$config.base_url}api/twitter-stats`, {
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((stats) => {
        commit('setTwitterStats', stats)
      })
      .catch(console.error)
  },

  getSponsorStats({ commit }) {
    fetch(`${this.$config.base_url}api/sponsor-stats`, {
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((stats) => {
        commit('setSponsorStats', stats)
      })
      .catch(console.error)
  },
}
