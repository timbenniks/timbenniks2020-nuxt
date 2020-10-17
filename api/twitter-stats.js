const axios = require('axios')
const HTMLParser = require('node-html-parser')

function extractDataFromHtml(node) {
  return {
    amount: node.querySelector('.DataPoint-info').structuredText.split(' ')[0],
    trend: node.querySelector('.DataPoint-trend').text,
    direction:
      node
        .querySelector('.DataPoint-trend')
        .classNames.filter((s) => s.includes('negative')).length > 0
        ? 'negative'
        : 'positive',
  }
}

function getSummary() {
  return new Promise((resolve, reject) => {
    const start = new Date()
    start.setDate(start.getDate() - 28)
    start.setUTCHours(0, 0, 0, 0)

    const end = new Date()
    end.setUTCHours(0, 0, 0, 0)

    axios
      .get(
        `https://analytics.twitter.com/user/timbenniks/home/summary.json?start_time=${start.getTime()}&end_time=${end.getTime()}`,
        {
          headers: {
            Cookie: `auth_token=${process.env.TWITTER_SUMMARY_TOKEN};`,
          },
        }
      )
      .then((response) => {
        const root = HTMLParser.parse(response.data.html)

        const results = {
          tweets: extractDataFromHtml(
            root.querySelector('[data-metric="tweets"]')
          ),
          impressions: extractDataFromHtml(
            root.querySelector('[data-metric="tweetviews"]')
          ),
          profileVisits: extractDataFromHtml(
            root.querySelector('[data-metric="profileviews"]')
          ),
          mentions: extractDataFromHtml(
            root.querySelector('[data-metric="mentions"]')
          ),
          followers: extractDataFromHtml(
            root.querySelector('[data-metric="followers"]')
          ),
        }

        resolve(results)
      })
      .catch(reject)
  })
}

module.exports = async (req, res) => {
  const summary = await getSummary()

  res.json({ summary })
}
