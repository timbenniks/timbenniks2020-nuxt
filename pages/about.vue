<template>
  <div class="content-wrapper blogpost">
    <navigation />

    <main id="main-content">
      <heading
        :title="document.title"
        :subtitle="document.sub_title"
        :breadcrumb="true"
        titletag="h1"
        subtitletag="h2"
        :use-fancy-titles="true"
      />
      <!-- eslint-disable vue/no-v-html -->
      <div ref="body" class="post-content" v-html="document.content"></div>
      <!--eslint-enable-->
    </main>
  </div>
</template>

<script>
import LinkMixin from '@/assets/mixins/linkMixin'
import SyntaxHighlighterMixin from '@/assets/mixins/syntaxHighlighterMixin'
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  mixins: [LinkMixin, SyntaxHighlighterMixin],
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-about" */ '@/datalayer/pages/about'
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

<style lang="scss">
.blogpost .heading {
  margin: rem(0 auto 20px) !important;
  max-width: rem(800px);

  h1,
  h2 {
    line-height: 1.2;
  }
}

.post-content {
  margin: 3rem auto;
  max-width: rem(800px);

  p,
  li {
    font-size: rem(18px);
    letter-spacing: 0.04em;
    line-height: 1.8;
  }

  blockquote {
    background: $blue-main;
    border-left: 3px solid $blue-light;
    padding: rem(0 0 0 10px);

    p {
      font-size: rem(16px);
      font-style: italic;
    }
  }

  figure {
    background: $blue-main;
    border-bottom: 3px solid $blue-light;
    display: block;
    margin: rem(0 0 32px);
    position: relative;

    figcaption {
      background: rgba($blue-main, 0.8);
      bottom: 0;
      font-size: inherit;
      font-size: rem(16px);
      padding: rem(3px 7px);
      position: absolute;
    }
  }
}
</style>
