import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

const index = client.initIndex('VIDEOS')

const search = async (facets) => {
  return await index.search('', {
    hitsPerPage: 100,
    facets: ['tags'],
    facetFilters: facets,
  })
}

module.exports = async (req, res) => {
  const facets = req.query.facets.split(',').map((facet) => {
    return `tags:${facet}`
  })

  const hits = await search(facets || '')
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.json(hits)
}
