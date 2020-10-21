import Prismic from 'prismic-javascript'
import dom from 'prismic-dom'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'

export const handler = async (context) => {
  const api = await getPrismicApi()

  const result = await api.getSingle('writings')

  const document = {
    ...result,
    title: dom.RichText.asText(result.data.title),
  }

  const writingsData = await api.query(
    Prismic.Predicates.at('document.type', 'writing'),
    { orderings: '[my.writing.publication_date desc]', pageSize: 100 }
  )

  const writings = writingsData.results

  const metaInfo = {
    fields: document.data,
    pageType: 'writings',
  }

  return {
    document,
    writings,
    metaInfo,
  }
}
