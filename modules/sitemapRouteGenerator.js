export default function () {
  this.nuxt.hook('generate:done', (context) => {
    const routesToExclude = process.env.NUXT_ENV_EXCLUDE_ROUTES
      ? process.env.NUXT_ENV_EXCLUDE_ROUTES.split(',')
      : []
    const allRoutes = Array.from(context.generatedRoutes)
    const routes = allRoutes.filter((route) => !routesToExclude.includes(route))

    this.nuxt.options.sitemap.routes = [...routes]
  })
}
