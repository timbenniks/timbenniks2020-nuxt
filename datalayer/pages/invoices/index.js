import Prismic from 'prismic-javascript'
import getPrismicApi from '@/datalayer/helpers/getPrismicApi'

export const handler = async (context) => {
  const api = await getPrismicApi()

  const invoicesData = await api.query(
    Prismic.Predicates.at('document.type', 'invoice'),
    { orderings: '[my.invoice.uid desc]', pageSize: 100 }
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
      paid_on: invoice.data.date_paid
        ? new Date(invoice.data.date_paid)
            .toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            .toString()
        : false,
      order_total: invoice.data.items.reduce((accumulator, item) => {
        return accumulator + item.item_price
      }, 0),
      title_lines: invoice.data.items.map((item) => {
        return item.item_name
      }),
      quarter: Math.floor((new Date(invoice.data.date).getMonth() + 3) / 3),
    }
  })

  const year2020 = { total: 0, invoices: [] }
  const year2021 = { total: 0, invoices: [] }

  invoices.forEach((invoice) => {
    switch (new Date(invoice.date).getFullYear()) {
      case 2020:
        year2020.invoices.push({
          ...invoice,
        })
        break

      case 2021:
        year2021.invoices.push({
          ...invoice,
        })
        break

      default:
        break
    }
  })

  year2020.total = year2020.invoices.reduce((accumulator, item) => {
    return accumulator + item.order_total
  }, 0)

  year2021.total = year2021.invoices.reduce((accumulator, item) => {
    return accumulator + item.order_total
  }, 0)

  return {
    invoices,
    year2020,
    year2021,
  }
}
