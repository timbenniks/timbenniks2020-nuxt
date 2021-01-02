<template>
  <div class="content-wrapper blogpost">
    <main id="main-content">
      <heading
        :title="document.title"
        :breadcrumb="true"
        titletag="h1"
        :use-fancy-titles="true"
      />

      <!-- <script
        data-name="BMC-Widget"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="timbenniks"
        data-description="Support me on Buy me a coffee!"
        data-message="Thank you for visiting. You can now buy me a coffee!"
        data-color="#FF813F"
        data-position="right"
        data-x_margin="24"
        data-y_margin="24"
      ></script> -->

      <div class="sponsor-wrapper">
        <sponsor alignment="left">
          <p>
            Click the button above to sponsor me or visit my
            <a
              href="https://www.buymeacoffee.com/timbenniks"
              target="_blank"
              rel="noopener"
              >buymeacoffee</a
            >
            page.
          </p>
        </sponsor>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div ref="body" class="post-content" v-html="document.content"></div>
      <!--eslint-enable-->
    </main>
  </div>
</template>

<script>
import LinkMixin from '@/assets/mixins/linkMixin'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  mixins: [LinkMixin],
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-sponsor-me" */ '@/datalayer/pages/sponsor-me'
    )
    const { document, metaInfo } = await handler(context)
    return {
      document,
      metaInfo,
    }
  },
  head() {
    return mapMetaInfo(
      this.metaInfo.fields,
      this.metaInfo.pageType,
      this.$router.currentRoute.path
    )
  },
}
</script>

<style lang="postcss">
/* // .blogpost .heading {
//   margin: rem(0 auto 20px) !important;
//   max-width: rem(800px);

//   h1,
//   h2 {
//     line-height: 1.2;
//   }
// }

// .sponsor-wrapper {
//   margin: 3rem auto;
//   max-width: rem(800px);
// }

// .post-content {
//   margin: 3rem auto 2rem;
//   max-width: rem(800px);

//   p,
//   li {
//     font-size: rem(18px);
//     letter-spacing: 0.04em;
//     line-height: 1.8;
//   }

//   blockquote {
//     background: $blue-main;
//     border-left: 3px solid $blue-light;
//     padding: rem(0 0 0 10px);

//     p {
//       font-size: rem(16px);
//       font-style: italic;
//     }
//   }

//   figure {
//     background: $blue-main;
//     border-bottom: 3px solid $blue-light;
//     display: block;
//     margin: rem(0 0 32px);
//     position: relative;

//     figcaption {
//       background: rgba($blue-main, 0.8);
//       bottom: 0;
//       font-size: inherit;
//       font-size: rem(16px);
//       padding: rem(3px 7px);
//       position: absolute;
//     }
//   }
// } */
</style>
