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
}

export const getters = {
  youTubeStats(state) {
    return state.youTubeStats
  },

  twitterStats(state) {
    return state.twitterStats
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
}
