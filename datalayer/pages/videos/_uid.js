import { RichText } from 'prismic-dom'
import Prismic from 'prismic-javascript'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'
import linkResolver from '@/datalayer/helpers/linkresolver'
import htmlSerializer from '@/datalayer/helpers/htmlserializer'
import { asDay, asMonth, asYear } from '@/datalayer/helpers/modifiers'

const getYTid = (url) => {
  return url.split('watch?v=')[1]
}

export const handler = async (context) => {
  const api = await getPrismicApi()
  const result = await api.getByUID('video', context.params.uid)

  const document = {
    ...result,

    title: RichText.asText(result.data.title),
    tags: result.tags,
    embed:
      result.data.video_embed.embed_url.replace('watch?v=', 'embed/') +
      '?autoplay=1&rel=0',
    content: RichText.asHtml(result.data.content, linkResolver, htmlSerializer),
    ytid: getYTid(result.data.video_embed.embed_url),
  }

  const relatedVideosData = await api.query(
    Prismic.Predicates.any('document.tags', document.tags),
    { orderings: '[my.video.publication_date desc]', pageSize: 4 }
  )

  const relatedVideos = relatedVideosData.results.map((video) => {
    return {
      uid: video.uid,
      title: RichText.asText(video.data.title),
      image: video.data.image.url,
      tags: video.tags,
      day: asDay(video.data.publication_date),
      month: asMonth(video.data.publication_date),
      year: asYear(video.data.publication_date),
    }
  })

  const metaInfo = {
    fields: {
      id: document.uid,
      last_publication_date: document.last_publication_date,
      ...document.data,
    },
    pageType: 'video',
  }

  return {
    document,
    relatedVideos,
    metaInfo,
  }
}
