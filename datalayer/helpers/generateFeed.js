import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-dom'
import getPrismicApi from './getPrismicApi'

async function getMappedDateForType(type) {
  const api = await getPrismicApi()

  const result = await api.query(Prismic.Predicates.at('document.type', type), {
    orderings: `[my.${type}.publication_date desc]`,
    pageSize: 100,
  })

  return result.results.map((thing) => {
    return {
      title: RichText.asText(thing.data.title),
      id: thing.uid,
      date: new Date(thing.data.publication_date),
      image: thing.data.image.url,
      link: `https://nostalgic-joliot-2055e1.netlify.app/${
        type === 'video' ? 'videos' : 'writings'
      }/${thing.uid}`,
      description: thing.data.body.find(
        (card) => card.slice_type === 'general_card'
      ).primary.description[0].text,
      author: [
        {
          name: 'Tim Benniks',
          email: 'timbenniks.dev@gmail.com',
          link: 'https://nostalgic-joliot-2055e1.netlify.app/',
        },
      ],
    }
  })
}

export default async (feed) => {
  const videos = await getMappedDateForType('video')
  const writings = await getMappedDateForType('writing')

  feed.options = {
    title: 'Tim Benniks',
    link: 'https://nostalgic-joliot-2055e1.netlify.app/feed.xml',
    id: 'https://nostalgic-joliot-2055e1.netlify.app',
    description: 'Tim Beniks blog and video feed',
    language: 'en',
    image: 'https://nostalgic-joliot-2055e1.netlify.app/icon.png',
    generator: 'Tim Benniks',
  }

  feed.addCategory('Web Development')

  videos.forEach((video) => {
    feed.addItem(video)
  })

  writings.forEach((writing) => {
    feed.addItem(writing)
  })

  feed.addContributor({
    name: 'Tim Benniks',
    email: 'timbenniks.dev@gmail.com',
    link: 'https://nostalgic-joliot-2055e1.netlify.app/',
  })
}
