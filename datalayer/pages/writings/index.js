import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'
import { asDay, asMonth, asYear } from '@/datalayer/helpers/modifiers'

export const handler = async (context) => {
  const api = await getPrismicApi()

  const result = await api.getSingle('writings')

  const document = {
    ...result,
    title: RichText.asText(result.data.title),
  }

  const writingsData = await api.query(
    Prismic.Predicates.at('document.type', 'writing'),
    { orderings: '[my.writing.publication_date desc]', pageSize: 100 }
  )

  const writings = writingsData.results.map((writing) => {
    return {
      uid: writing.uid,
      title: RichText.asText(writing.data.title),
      sub_title: RichText.asText(writing.data.sub_title),
      image: writing.data.image.url,
      day: asDay(writing.data.publication_date),
      month: asMonth(writing.data.publication_date),
      year: asYear(writing.data.publication_date),
    }
  })

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
