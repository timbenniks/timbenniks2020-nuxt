export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Tim Benniks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-site-verification',
        content: 'El5Wtr19CHQY1u_sQOjbuusrXqYCt6I6n3OJSyZEPAg',
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
      { rel: 'preconnect', href: 'https://images.prismic.io' },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['assets/styles/index.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: '~plugins/ga.js', ssr: false }],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      'nuxt-purgecss',
      {
        mode: 'postcss',
        whitelist: [
          'page-enter-active',
          'page-leave-active',
          'page-enter',
          'page-leave-active',
        ],
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/prismic', '@nuxtjs/sitemap'],
  prismic: {
    endpoint: 'https://timbenniks.prismic.io/api/v2',
    linkResolver: '@/plugins/linkresolver',
    htmlSerializer: '@/plugins/htmlserializer',
    components: true,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
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
    hostname: 'https://timbenniks2020-nuxt.vercel.app/',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: ['/startpage', '/preview'],
  },
  publicRuntimeConfig: {
    algolia_app_id: process.env.ALGOLIA_APP_ID,
    algolia_api_key: process.env.ALGOLIA_ADMIN_KEY,
  },
  router: {
    linkExactActiveClass: 'active',
  },
}
