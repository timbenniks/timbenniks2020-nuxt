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

      <div class="posts">
        <article
          v-for="invoice in invoices"
          :key="invoice.uid"
          class="post speaking"
        >
          <div class="post-date">
            <span class="post-date-day">&euro;{{ invoice.order_total }}</span>
          </div>
          <div class="post-content-wrapper">
            <div class="post-titles">
              <p class="post-title fancy-title red">
                <nuxt-link :to="`/invoices/${invoice.uid}`">
                  {{ invoice.title_line }}
                </nuxt-link>
              </p>
              <p class="post-subject">
                <span class="post-location"
                  >[{{ invoice.uid }}] {{ invoice.date }}</span
                >
                &mdash;
                {{ invoice.billing_address_name }}
              </p>
            </div>
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
    const { invoices } = await handler(context)

    return {
      invoices,
    }
  },
  head: {
    title: 'Invoices',
  },
}
</script>

<style lang="scss" scoped>
.heading,
.posts,
.post-title-sep,
.no-upcoming-talks {
  margin: 0 auto 2rem;
  max-width: rem(800px);
}

.no-upcoming-talks {
  margin: rem(0 auto 40px);
}

.post-title {
  margin: rem(0 0 6px 0);
}
</style>
