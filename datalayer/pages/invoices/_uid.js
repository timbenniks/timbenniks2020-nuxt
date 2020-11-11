import getPrismicApi from '@/datalayer/helpers/getPrismicApi'

export const handler = async (context) => {
  const api = await getPrismicApi()
  const result = await api.getByUID('invoice', context.params.uid)

  const document = {
    ...result.data,
    items: result.data.items.map((item) => {
      return {
        item_name: item.item_name,
        item_tax: '0%',
        item_price: item.item_price,
      }
    }),
    date: new Date(result.data.date)
      .toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      .toString(),
    order_total: result.data.items.reduce((accumulator, item) => {
      return accumulator + item.item_price
    }, 0),
    filename: `${result.data.date}|${result.uid}.pdf`,
    uid: result.uid,
  }

  return {
    document,
  }
}
