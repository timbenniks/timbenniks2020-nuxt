<template>
  <div class="content-wrapper">
    <navigation />

    <main id="main-content">
      <client-only>
        <div class="filters no-count">
          <nuxt-link class="filter" to="/invoices"
            >&lt; Back to invoices</nuxt-link
          >
          <button class="filter">Edit Invoice</button>
          <button class="filter" @click="generatePdf()">Print PDF</button>
        </div>
        <div ref="invoice" class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="4">
                <table>
                  <tr>
                    <td class="title">
                      <img src="/icon.png" width="100" />
                    </td>
                    <td>
                      Facture : {{ document.uid }}<br />
                      <template v-if="document.order_reference"
                        >Réf. de commande : {{ document.order_reference }}<br
                      /></template>
                      Date : {{ document.date }}<br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="information">
              <td colspan="4">
                <table>
                  <tr>
                    <td>
                      <strong>Vendeur / Seller</strong><br />
                      Tim Benniks<br />
                      152 Promenade du Verger<br />
                      92130 Issy Les Moulineaux<br />
                      timbenniks.dev@gmail.com<br />
                      +33 7 72 28 81 49<br />
                      SIRET : 890 360 290 00013<br /><br />
                    </td>

                    <td>
                      <strong>Acheteur / Buyer</strong><br />
                      {{ document.billing_address_name }}<br />
                      {{ document.billing_address_street1 }}
                      {{ document.billing_address_street2 }}<br />
                      {{ document.billing_address_city }},
                      {{ document.billing_address_state }}
                      {{ document.billing_address_zipcode }}
                      {{ document.billing_address_country }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="heading">
              <td class="desc">Désignation / Description</td>
              <td>TVA*</td>
              <td>Total</td>
            </tr>
            <tr
              v-for="item in document.items"
              :key="item.item_name"
              class="item"
            >
              <td class="desc">{{ item.item_name }}</td>
              <td>{{ item.item_tax }}</td>
              <td>&euro;{{ item.item_price }}</td>
            </tr>
          </table>
          <br />
          <table class="totals">
            <tr>
              <td width="450"></td>
              <td>Total HT / Total net amount</td>
              <td>&euro;{{ document.order_total }}</td>
            </tr>
            <tr>
              <td width="450"></td>
              <td>TVA</td>
              <td>&euro;0,00</td>
            </tr>
            <tr>
              <td width="450"></td>
              <td>Total TTC / Total gross amount</td>
              <td>&euro;{{ document.order_total }}</td>
            </tr>
          </table>
          <br />
          <br />
          <br />
          <table>
            <tr>
              <td>
                <strong>Domiciliation Du Compte</strong><br />
                IBAN: NL72 BUNQ 2048 0493 97<br />
                BIC: BUNQNL2A<br /><br />
                <strong>bunq</strong><br />
                131-133 Naritaweg, 1043 BS Amsterdam
                <br />Netherlands
              </td>
            </tr>
          </table>

          <p style="margin: 50px 0 0 0; text-align: center">
            *TVA non-applicable, article 293B du CGI
          </p>
        </div>
      </client-only>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-invoices-uid" */ '@/datalayer/pages/invoices/_uid'
    )
    const { document } = await handler(context)
    return {
      document,
    }
  },

  mounted() {
    window.$INJECTED_URLS = {}
  },
  methods: {
    hasScript(url) {
      return window.$INJECTED_URLS[url]
    },

    injectScript(url, options = {}) {
      if (!this.hasScript(url)) {
        const tag = document.createElement('script')
        const head = document.getElementsByTagName('head')[0]

        tag.src = url
        tag.async = options.async !== undefined ? options.async : true
        tag.type = 'application/javascript'

        Object.keys(options)
          .filter((key) => key !== 'async')
          .forEach((key) => {
            if (options[key]) {
              tag.setAttribute(key, options[key])
            }
          })

        window.$INJECTED_URLS[url] = new Promise((resolve) => {
          tag.addEventListener('load', resolve)
          head.appendChild(tag)
        })

        return window.$INJECTED_URLS[url]
      }

      return Promise.resolve().then(() => window.$INJECTED_URLS[url])
    },
    generatePdf() {
      const src = '/html2pdf.bundle.js'

      if (!this.hasScript(src)) {
        this.injectScript(src, {
          crossOrigin: true,
          async: true,
        }).then(() => {
          const options = {
            filename: this.document.filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          }

          window.html2pdf().from(this.$refs.invoice).set(options).save()
        })
      }
    },
  },
  head: {
    title: 'Invoice',
  },
}
</script>

<style lang="postcss" scoped>
/* .invoice-box {
  background: #fff;
  color: #000;
  width: rem(800px);
  margin: 1rem auto 2rem;
  box-shadow: 2px 2px 4px #000;
  padding: 1rem;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;

  img {
    width: 100px;
    height: auto;
    border-radius: 100%;
  }

  table {
    width: 100%;
    line-height: inherit;
    text-align: left;

    td {
      padding: 5px;
      vertical-align: top;
    }

    tr td:nth-child(2) {
      text-align: right;
    }

    tr.top table td {
      padding-bottom: 0px;
    }

    tr.information table td {
      padding-bottom: 0px;
    }

    tr.heading td {
      background: #eee;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
      text-align: left;
    }

    tr.details td {
      padding-bottom: 10px;
    }

    tr.item td {
      border-bottom: 1px solid #eee;
      text-align: left;
    }

    tr.item.last td {
      border-bottom: none;
    }
  }

  .desc {
    width: 450px;
    padding-right: 100px;
  }

  .totals td {
    text-align: left !important;
    padding: 0 !important;
  }
} */
</style>
