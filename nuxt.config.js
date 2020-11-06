import Prismic from 'prismic-javascript'
import BundleAnalyzerPlugin from '@bundle-analyzer/webpack-plugin'

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
    link: [{ rel: 'preconnect', href: 'https://www.google-analytics.com' }],
  },
  css: ['assets/styles/index.scss'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-6797812-3',
        ignoreRoutes: ['/startpage'],
      },
    ],
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
  modules: ['@nuxtjs/sitemap'],
  build: {
    plugins: [
      new BundleAnalyzerPlugin({ token: process.env.BUNDLE_ANALYZER_TOKEN }),
    ],
  },
  styleResources: {
    scss: [
      'assets/styles/_packages.scss',
      'assets/styles/_variables.scss',
      'assets/styles/_mixins.scss',
    ],
  },
  loading: {
    color: '#d62b31',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://timbenniks.dev',
    cacheTime: 1000 * 60 * 15,
    exclude: ['/startpage'],
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
    routes() {
      return Prismic.getApi('https://timbenniks.prismic.io/api/v2').then(
        (api) => {
          return api
            .query(Prismic.Predicates.at('document.type', 'video'), {
              orderings: '[my.video.publication_date desc]',
              pageSize: 100,
            })
            .then((videos) => {
              return videos.results.map((video) => {
                return `/videos/${video.uid}`
              })
            })
        }
      )
    },
  },
}
