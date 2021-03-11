const axios = require('axios')

function getPlausibleStats() {
  const apiKey = process.env.PLAUSIBLE_API_KEY
  return axios.get(
    'https://plausible.io/api/v1/stats/aggregate?site_id=timbenniks.dev&period=30d&metrics=visitors,pageviews,bounce_rate,visit_duration',
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  )
}

module.exports = async (req, res) => {
  const plausibleStats = await getPlausibleStats()

  res.json({
    plausibleStats: plausibleStats.data,
  })
}
