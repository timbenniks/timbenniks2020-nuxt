// import BundleAnalyzerPlugin from '@bundle-analyzer/webpack-plugin'
// import videoRoutes from './datalayer/helpers/generateVideoRoutes'
import generateFeed from './datalayer/helpers/generateFeed'

export default {
  target: 'static',
  modern: process.env.NODE_ENV === 'development' ? false : 'client',
  head: {
    titleTemplate: '%s - Tim Benniks',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-site-verification',
        content: 'hif_cn9hF2RVSnTq5HwjSkKrXqJT9Q6BR_FaBBmr-20',
      },
      { property: 'og:site_name', content: 'Tim Benniks' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:handle', content: 'timbenniks' },
      { property: 'twitter:creator', content: 'timbenniks' },
      { name: 'author', content: 'Tim Benniks' },
      { name: 'robots', content: 'index, follow' },
    ],

    __dangerouslyDisableSanitizers: ['script', 'innerHTML'],
    script: [
      {
        src:
          'https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js',
      },
      {
        innerHTML: `
        algoliasearchNetlify({
          appId: 'RY2GXNHC2F',
          apiKey: '93ce558ed5c523626497f8e65ce37688',
          siteId: 'f0591dc4-8c8e-4634-90a1-3b8bbb277572',
          branch: 'netlify-algolia-plugin',
          selector: 'div#search',
        });`,
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css',
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'RSS Feed for timbenniks.dev',
        href: '/feed.xml',
      },
    ],
  },
  css: ['assets/styles/index.scss'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/pwa',
      {
        workbox: {
          clientsClaim: false,
        },
      },
    ],
    '@/modules/sitemapRouteGenerator',
  ],
  modules: ['@nuxtjs/sitemap', '@nuxtjs/feed', 'vue-plausible'],
  styleResources: {
    scss: [
      'assets/styles/_packages.scss',
      'assets/styles/_variables.scss',
      'assets/styles/_mixins.scss',
    ],
  },
  plausible: {
    domain: 'timbenniks.dev',
    trackLocalhost: false,
  },
  loading: {
    color: '#d62b31',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://nostalgic-joliot-2055e1.netlify.app',
    cacheTime: 1000 * 60 * 15,
    exclude: ['startpage'],
  },
  publicRuntimeConfig: {
    algolia_app_id: process.env.ALGOLIA_APP_ID,
    algolia_api_key: process.env.ALGOLIA_ADMIN_KEY,
    base_url: process.env.BASE_URL,
  },
  router: {
    linkExactActiveClass: 'active',
  },
  pwa: {
    manifest: {
      name: 'timbenniks.dev',
      short_name: 'timbenniks',
    },
  },
  // generate: {
  //   async routes() {
  //     return await videoRoutes()
  //   },
  // },
  render: {
    injectScripts: true,
  },
  plugins: ['~/plugins/youtube.client.js'],
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        return await generateFeed(feed)
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
}
