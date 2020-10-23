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
  searchResults: {
    query: '',
    prismicTags: [],
    facets: [],
    hits: [],
    loading: false,
    results: 0,
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

  setSearchResults(state, results) {
    state.searchResults.facets = results.facets.tags
    state.searchResults.hits = results.hits
    state.searchResults.results = results.nbHits
  },

  setSearchQuery(state, payload) {
    state.searchResults.query = payload
  },

  setPrismicTags(state, payload) {
    state.searchResults.prismicTags = payload.sort()
  },

  setSearchLoading(state, payload) {
    state.searchResults.loading = payload
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

  searchHits(state) {
    return state.searchResults.hits
  },

  searchResults(state) {
    return state.searchResults.results
  },

  searchQuery(state) {
    return state.searchResults.query
  },

  facets(state) {
    const facets = []

    const findTagAmount = (tag) => {
      if (tag in state.searchResults.facets) {
        return state.searchResults.facets[tag]
      } else {
        return 0
      }
    }

    const facetInQuery = (facet) => {
      return state.searchResults.query.includes(facet)
    }

    state.searchResults.prismicTags.forEach((tag) => {
      facets.push({
        label: tag,
        active: facetInQuery(tag),
        amount: findTagAmount(tag),
        disabled: findTagAmount(tag) === 0,
      })
    })

    return facets
  },

  searchLoading(state) {
    return state.searchResults.loading
  },
}

export const actions = {
  getYouTubeStats({ commit }) {
    fetch(`${this.$config.base_url}api/youtube-stats`, {
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((stats) => commit('setYouTubeStats', stats))
  },

  getTwitterStats({ commit }) {
    fetch(`${this.$config.base_url}api/twitter-stats`, {
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((stats) => {
        commit('setTwitterStats', stats)
      })
  },

  getSponsorStats({ commit }) {
    fetch(`${this.$config.base_url}api/sponsor-stats`, {
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((stats) => {
        commit('setSponsorStats', stats)
      })
  },

  searchAlgolia({ commit }, payload = '') {
    commit('setSearchLoading', true)

    fetch(`${this.$config.base_url}api/algolia-search?facets=${payload}`)
      .then((response) => response.json())
      .then((results) => {
        commit('setSearchQuery', payload)
        commit('setSearchResults', results)
        commit('setSearchLoading', false)
      })
  },

  getPrismicTags({ commit }, payload) {
    commit('setPrismicTags', payload)
  },
}
