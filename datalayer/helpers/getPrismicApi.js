import Prismic from 'prismic-javascript'

export default async () => {
  return await Prismic.getApi('https://timbenniks.prismic.io/api/v2', {
    accessToken: process.env.PRISMIC_TOKEN,
  })
}
