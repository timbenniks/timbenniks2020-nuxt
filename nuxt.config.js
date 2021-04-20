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
    script: [
      {
        innerHTML: `function initXdnRum() {
          new XDN.Metrics({
            token: "99a41f3a-cb38-4abd-bfdf-12e3f9b4c090",
            router: new XDN.Router()
            .match('/', ({ setPageLabel }) => setPageLabel('home'))
            .match('/videos', ({ setPageLabel }) => setPageLabel('videos'))
            .match('/videos/:id', ({ setPageLabel }) => setPageLabel('video'))
            .match('/writings', ({ setPageLabel }) => setPageLabel('writings'))
            .match('/writings/:id', ({ setPageLabel }) => setPageLabel('writing'))
            .match('/about', ({ setPageLabel }) => setPageLabel('about'))
            .match('/sponsor-me', ({ setPageLabel }) => setPageLabel('sponsor'))
            .match('/speaking', ({ setPageLabel }) => setPageLabel('speaking'))
            .match('/startpage', ({ setPageLabel }) => setPageLabel('startpage'))
          }).collect()
        }`,
        defer: true,
      },
      {
        defer: true,
        src: 'https://rum.moovweb.app/latest.js',
        onload: 'initXdnRum()',
      },
    ],
    link: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'RSS Feed for timbenniks.dev',
        href: '/feed.xml',
      },

      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href:
          'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href:
          'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href:
          'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh50XSwaPGQ3q5d0N7w.woff2',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href:
          'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh50XSwiPGQ3q5d0.woff2',
        crossorigin: true,
      },
    ],
    __dangerouslyDisableSanitizers: ['script', 'innerHTML'],
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
    hostname: 'https://timbenniks.dev',
    cacheTime: 1000 * 60 * 15,
    exclude: ['startpage', 'invoices'],
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
