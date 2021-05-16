import Prismic from '@prismicio/client'

export default async () => {
  return await Prismic.getApi('https://timbenniks.prismic.io/api/v2', {
    accessToken: process.env.PRISMIC_TOKEN,
  })
}
