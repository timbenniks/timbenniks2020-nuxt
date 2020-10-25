import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-dom'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'

export const handler = async (context) => {
  const api = await getPrismicApi()

  const result = await api.getSingle('youtube')

  const document = {
    ...result,
    title: RichText.asText(result.data.title),
  }

  const videos = await api.query(
    Prismic.Predicates.at('document.type', 'video'),
    { orderings: '[my.video.publication_date desc]', pageSize: 100 }
  )

  const tagsHolder = []
  videos.results.forEach((result) => {
    result.tags.forEach((tag) => {
      tagsHolder.push(tag)
    })
  })

  const tags = [...new Set(tagsHolder)]

  const metaInfo = {
    fields: document.data,
    pageType: 'videos',
  }

  return {
    document,
    tags,
    metaInfo,
  }
}
