import { asDay, asMonth, asYear } from '@/datalayer/helpers/modifiers';

export const state = () => ({
  searchResults: {
    query: '',
    prismicTags: [],
    facets: [],
    hits: [],
    loading: false,
    results: 0,
  },
});

export const mutations = {
  setSearchResults(state, results) {
    state.searchResults.facets = results.facets.tags;
    state.searchResults.results = results.nbHits;

    state.searchResults.hits = results.hits.map((hit) => {
      return {
        image: hit.image,
        slug: hit.slug,
        tags: hit.tags,
        title: hit.title,
        publication_date: hit.publication_date,
        day: asDay(hit.publication_date),
        month: asMonth(hit.publication_date),
        year: asYear(hit.publication_date),
      };
    });
  },

  setSearchQuery(state, payload) {
    state.searchResults.query = payload;
  },

  setPrismicTags(state, payload) {
    state.searchResults.prismicTags = payload.sort();
  },

  setSearchLoading(state, payload) {
    state.searchResults.loading = payload;
  },
};

export const getters = {
  searchHits(state) {
    return state.searchResults.hits;
  },

  searchResults(state) {
    return state.searchResults.results;
  },

  searchQuery(state) {
    return state.searchResults.query;
  },

  facets(state) {
    const facets = [];

    const findTagAmount = (tag) => {
      if (tag in state.searchResults.facets) {
        return state.searchResults.facets[tag];
      } else {
        return 0;
      }
    };

    const facetInQuery = (facet) => {
      return state.searchResults.query.includes(facet);
    };

    state.searchResults.prismicTags.forEach((tag) => {
      facets.push({
        label: tag,
        active: facetInQuery(tag),
        amount: findTagAmount(tag),
        disabled: findTagAmount(tag) === 0,
      });
    });

    return facets;
  },

  searchLoading(state) {
    return state.searchResults.loading;
  },
};

export const actions = {
  searchAlgolia({ commit }, payload = '') {
    commit('setSearchLoading', true);

    fetch(`${this.$config.base_url}api/algolia-search?facets=${payload}`)
      .then((response) => response.json())
      .then((results) => {
        commit('setSearchQuery', payload);
        commit('setSearchResults', results);
        commit('setSearchLoading', false);
      });
  },

  getPrismicTags({ commit }, payload) {
    commit('setPrismicTags', payload);
  },
};
