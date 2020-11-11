import Prismic from 'prismic-javascript'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'

export const handler = async (context) => {
  const api = await getPrismicApi()

  const invoicesData = await api.query(
    Prismic.Predicates.at('document.type', 'invoice'),
    { orderings: '[my.invoice.publication_date desc]', pageSize: 100 }
  )

  const invoices = invoicesData.results.map((invoice) => {
    return {
      ...invoice.data,
      uid: invoice.uid,
      date: new Date(invoice.data.date)
        .toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        .toString(),
      order_total: invoice.data.items.reduce((accumulator, item) => {
        return accumulator + item.item_price
      }, 0),
      title_line: invoice.data.items[0].item_name,
    }
  })

  return {
    invoices,
  }
}
