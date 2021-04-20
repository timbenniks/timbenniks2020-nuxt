<template>
  <div class="content-wrapper speaking">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="false"
        titletag="h1"
        title="Invoices"
        :uppercase="true"
      />

      <div class="stats-wrapper">
        <div class="stats">
          <fancy-title
            tag="h2"
            field="2020 totals"
            color="red"
            type="small"
            :offset="[0, 0]"
            :uppercase="true"
          />

          <p>Total earned: &euro;{{ year2020.total.toFixed(2) }}</p>
          <p>Amount of jobs: {{ year2020.invoices.length }}</p>
        </div>
        <div class="stats">
          <fancy-title
            tag="h2"
            field="2021 totals"
            color="red"
            type="small"
            :offset="[0, 0]"
            :uppercase="true"
          />

          <p>Total earned: &euro;{{ year2021.total.toFixed(2) }}</p>
          <p>Amount of jobs: {{ year2021.invoices.length }}</p>
        </div>
      </div>
      <div class="posts">
        <article
          v-for="invoice in invoices"
          :key="invoice.uid"
          class="post speaking"
        >
          <div class="post-content-wrapper">
            <div class="post-titles">
              <p class="post-title fancy-title blue-dark">
                Q{{ invoice.quarter }}
              </p>
              <p class="post-title fancy-title red">
                <nuxt-link :to="`/invoices/${invoice.uid}`">
                  {{ invoice.uid }}
                </nuxt-link>
              </p>
              <p class="post-title fancy-title blue-main">
                &euro;{{ invoice.order_total }}
              </p>

              <p v-if="!invoice.paid" class="post-title fancy-title yellow">
                PAYMENT PENDING
              </p>
            </div>
            <p class="post-subject">
              {{ invoice.date }}.
              <span v-if="invoice.paid_on">Paid at: {{ invoice.paid_on }}</span>
            </p>
            <ul v-if="invoice.title_lines.length > 1">
              <li v-for="title in invoice.title_lines" :key="title">
                {{ title }}
              </li>
            </ul>
            <p v-else>{{ invoice.title_lines[0] }}</p>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-invoices" */ '@/datalayer/pages/invoices'
    )
    const { invoices, year2020, year2021 } = await handler(context)
    return {
      invoices,
      year2020,
      year2021,
    }
  },
  head: {
    title: 'Invoices',
  },
}
</script>

<style lang="scss" scoped>
.post-subject {
  margin: 0 0 0.5rem 0;
}

ul {
  margin: 0 0 0 1.25rem;
}

.payment {
  margin: 1rem 0;

  strong.payment-pending {
    background: $yellow;
    color: #000;
    padding: rem(2px 5px);
  }
}

.stats-wrapper {
  display: flex;
  max-width: 68.75rem;
  margin: 0 auto 1rem;

  .stats {
    margin: 0 1rem 0 0;

    h2 {
      margin: 0 0 1rem 0;
    }

    p {
      margin: 0;
    }
  }
}

.post-subject span {
  color: $yellow;
}
</style>
