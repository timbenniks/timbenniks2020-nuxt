import Prismic from 'prismic-javascript'
import getPrismicApi from './getPrismicApi'

export default async () => {
  const api = await getPrismicApi()

  const videos = await api.query(
    Prismic.Predicates.at('document.type', 'video'),
    {
      orderings: '[my.video.publication_date desc]',
      pageSize: 100,
    }
  )

  return videos.results.map((video) => `/videos/${video.uid}`)
}
