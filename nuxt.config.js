// import BundleAnalyzerPlugin from '@bundle-analyzer/webpack-plugin'
import videoRoutes from './datalayer/helpers/generateVideoRoutes'
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
    link: [
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
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
  },
  loading: {
    color: '#d62b31',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://timbenniks.dev',
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
  generate: {
    async routes() {
      return await videoRoutes()
    },
  },
  plugins: [],
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
