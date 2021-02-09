// Thanks to @DasSurma https://twitter.com/DasSurma/status/1355214309022957570
import { getCLS, getFID, getLCP, getTTFB, getFCP } from 'web-vitals'

function send(data) {
  navigator.sendBeacon(
    'https://google-analytics.com/collect',
    new URLSearchParams({
      ...{
        v: '1',
        tid: 'UA-6797812-3',
        cid: `${Date.now()}${Math.random()}`,
        dl: location.href,
        ua: navigator.userAgent,
        dr: document.referrer || '',
        sr: `${screen.width}x${screen.height}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${screen.pixelDepth}-bits`,
        ul: navigator.language,
      },
      ...data,
    }).toString()
  )
}

function measureWebVitalsMetric({ name, delta, id }) {
  send({
    t: 'event',
    ec: 'Web Vitals',
    ea: name,
    el: id,
    ev: Math.round(name === 'CLS' ? delta * 1000 : delta),
    ni: '1',
  })
}

export default ({ app }) => {
  app.router.afterEach(() => {
    send({ t: 'pageview' })

    getCLS(measureWebVitalsMetric)
    getFID(measureWebVitalsMetric)
    getLCP(measureWebVitalsMetric)
    getTTFB(measureWebVitalsMetric)
    getFCP(measureWebVitalsMetric)
  })
}
