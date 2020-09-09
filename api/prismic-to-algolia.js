const Prismic = require('prismic-javascript')
const Algoliasearch = require('algoliasearch')

function getPrismicApi() {
  return Prismic.getApi('https://timbenniks.cdn.prismic.io/api/v2', {
    accessToken: process.env.PRISMIC_TOKEN,
  })
}

module.exports = async (req, res) => {
  const prismicClient = await getPrismicApi()
  const algoliaClient = Algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )

  const { results } = await prismicClient.query(
    Prismic.Predicates.at('document.type', 'video'),
    {
      orderings: '[my.video.publication_date desc]',
      pageSize: 1000,
    }
  )

  const algoliaReadyResults = results.map((video) => {
    return {
      title: video.data.title.text,
      image: video.data.image.url,
      tags: video.tags,
      slug: video.uid,
      publication_date: video.data.publication_date,
      modified: video.last_publication_date,
      objectID: video.uid,
    }
  })

  const algoliaIndex = algoliaClient.initIndex('VIDEOS')
  const algoliaObjectIds = await algoliaIndex
    .saveObjects(algoliaReadyResults)
    .catch((err) => res.json(err))

  if (algoliaObjectIds) {
    res.json({
      message:
        'Algolia VIDEOS index has been updated with all videos from Prismic.',
    })
  }
}
