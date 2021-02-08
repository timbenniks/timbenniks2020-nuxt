const send = (path, data) => {
  navigator.sendBeacon(
    'https://google-analytics.com/collect',
    new URLSearchParams({
      ...{
        v: '1',
        tid: 'UA-6797812-3',
        cid: `${Date.now()}${Math.random()}`,
        dl: path,
      },
      ...data,
    }).toString()
  )
}

export default ({ app }) => {
  app.router.afterEach((to) => {
    send(to.path, { t: 'pageview' })
  })
}
