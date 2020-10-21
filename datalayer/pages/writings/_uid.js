import dom from 'prismic-dom'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'

export const handler = async (context) => {
  const api = await getPrismicApi()
  const result = await api.getByUID('writing', context.params.uid)

  const document = {
    title: dom.RichText.asText(result.data.title),
    sub_title: dom.RichText.asText(result.data.sub_title),
    content: dom.RichText.asHtml(result.data.content),
    ...result,
  }

  const metaInfo = {
    fields: {
      id: document.uid,
      last_publication_date: document.last_publication_date,
      ...document.data,
    },
    pageType: 'writing',
  }

  return {
    document,
    metaInfo,
  }
}
