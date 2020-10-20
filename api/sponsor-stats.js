const axios = require('axios')
const baseUrl = 'https://developers.buymeacoffee.com/api/v1'
const token = process.env.BMAC_TOKEN
const queryPage = (which, page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/${which}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch(reject)
  })
}

const getData = async (which, page = 1) => {
  const response = await queryPage(which, page)
  const result = response.data

  if (response.last_page > page) {
    for (let i = page; i < response.last_page; i++) {
      const newPage = await queryPage(which, i + 1)
      newPage.data.forEach((item) => {
        result.push(item)
      })
    }

    return result
  } else {
    return result
  }
}

module.exports = async (req, res) => {
  const supporters = await getData('supporters')
  const subscriptions = await getData('subscriptions')

  res.json({ supporters, subscriptions })
}
