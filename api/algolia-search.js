import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

const index = client.initIndex('VIDEOS')

const search = async (facets) => {
  return await index.search(facets, {
    hitsPerPage: 100,
    facets: ['tags'],
  })
}

module.exports = async (req, res) => {
  const hits = await search(req.query.facets ? req.query.facets : '')
  res.json(hits)
}
