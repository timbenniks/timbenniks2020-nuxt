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
      {
        rel: 'preconnect',
        href: 'https://res.cloudinary.com',
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
    '@nuxtjs/google-fonts',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    '@/modules/sitemapRouteGenerator',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
  ],
  image: {
    screens: {
      xs: 375,
      sm: 500,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dwfcofnrd/image/fetch/',
    },
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
    'vue-plausible',
    'nuxt-interpolation',
  ],
  styleResources: {
    scss: [
      'assets/styles/_packages.scss',
      'assets/styles/_variables.scss',
      'assets/styles/_mixins.scss',
    ],
    hoistUseStatements: true,
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
  },
  publicRuntimeConfig: {
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
  googleFonts: {
    families: {
      Lato: [400, 900],
    },
    display: 'swap',
    download: true,
    inject: true,
    stylePath: 'styles/fonts.css',
  },
}
