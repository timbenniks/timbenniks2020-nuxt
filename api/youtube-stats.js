const { google } = require('googleapis')

function getChannelStats() {
  const youtube = google.youtube('v3')

  return new Promise((resolve, reject) => {
    youtube.channels.list(
      {
        auth: process.env.YOUTUBE_API_KEY,
        part: 'statistics',
        forUsername: 'timbenniks',
      },
      function (err, response) {
        if (err) {
          reject(err)
        }

        const channels = response.data.items
        if (channels.length === 0) {
          reject(new Error('No channel found'))
        } else {
          const result = {
            ...channels[0].statistics,
          }

          resolve(result)
        }
      }
    )
  })
}

module.exports = async (req, res) => {
  const channelStats = await getChannelStats()
  res.json({ channelStats })
}
