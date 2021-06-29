import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'
import linkResolver from '@/datalayer/helpers/linkresolver'
import htmlSerializer from '@/datalayer/helpers/htmlserializer'
import { asDay, asMonth, asYear } from '@/datalayer/helpers/modifiers'

export const useContent = async () => {
  const api = await getPrismicApi()

  const graphQuery = `
  {
    home {
      ...homeFields
      body {
        ...on general_card {
          non-repeat {
            ...non-repeatFields
          }
        }
        ...on twitter_card {
          non-repeat {
            ...non-repeatFields
          }
        }
      }
      body1 {
        ...on hero_banner {
          non-repeat {
            ...non-repeatFields
          }
        }
        ...on top_videos {
          non-repeat {
            ...non-repeatFields
          }
          repeat {
            ...repeatFields
            video {
              ...on video {
                ...videoFields
              }
            }
          }
        }
      }
    }
  }`

  const result = await api.getSingle('home', { graphQuery })

  const document = {
    description: RichText.asHtml(
      result.data.description,
      linkResolver,
      htmlSerializer
    ),
    ...result,
  }

  const heroBannerData = document.data.body1.find(
    (slice) => slice.slice_type === 'hero_banner'
  ).primary

  const heroBanner = {
    title: RichText.asText(heroBannerData.title),
    subtitle: RichText.asText(heroBannerData.subtitle),
    banner_image: {
      url: heroBannerData.banner_image.url,
      alt: heroBannerData.banner_image.alt,
    },
    logo: {
      url: heroBannerData.logo.url,
      alt: heroBannerData.logo.alt,
    },
  }

  const topVideosData = document.data.body1.find(
    (slice) => slice.slice_type === 'top_videos'
  )

  const topVideos = {
    title: RichText.asText(topVideosData.primary.top_videos_list),
    intro: RichText.asHtml(
      topVideosData.primary.intro_text,
      linkResolver,
      htmlSerializer
    ),
  }

  topVideos.videos = topVideosData.items.map((item) => {
    return {
      slug: item.video.uid,
      title: RichText.asText(item.video.data.title),
      image: item.video.data.image.url,
      publication_date: item.video.data.publication_date,
      day: asDay(item.video.data.publication_date),
      month: asMonth(item.video.data.publication_date),
      year: asYear(item.video.data.publication_date),
      tags: item.video.tags,
    }
  })

  const writings = await api.query(
    Prismic.Predicates.at('document.type', 'writing'),
    { orderings: '[my.writing.publication_date desc]', pageSize: 3 }
  )

  const latestWritings = writings.results.map((writing) => {
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
    pageType: 'home',
  }

  return {
    document,
    heroBanner,
    topVideos,
    latestWritings,
    metaInfo,
  }
}
