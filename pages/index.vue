<template>
  <div class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <div class="homepage">
        <lazy-image
          ratio="1/1"
          :alt="$prismic.asText(document.main_title)"
          :url="document.image.url"
          extra-class="opacity-only"
          :caption="false"
          :widths="[200]"
          sizes="200px"
        />

        <div class="home-copy-wrapper">
          <fancy-title
            :field="$prismic.asText(document.main_title)"
            tag="h1"
            color="red"
            type="large"
            :offset="[0, 1]"
            :uppercase="true"
          />

          <fancy-title
            :field="$prismic.asText(document.sub_title)"
            tag="h2"
            color="blue-main"
            type="small"
            :offset="[-0.18, 0]"
            :uppercase="true"
          />

          <!-- eslint-disable vue/no-v-html -->
          <div
            class="homepage-description"
            v-html="$prismic.asHtml(document.description)"
          ></div>
          <!--eslint-enable-->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LinkMixin from '../assets/mixins/linkMixin'
import mapMetaInfo from '../assets/prismic/mapMetaInfo'

export default {
  mixins: [LinkMixin],
  async asyncData({ $prismic, error }) {
    try {
      const document = (await $prismic.api.getSingle('home')).data
      return {
        document,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    return mapMetaInfo(this.document, 'home', this.$router.currentRoute)
  },
}
</script>

<style lang="scss">
.homepage {
  // prettier-ignore
  @include responsive('width', (xs: 100%, m: 80%));
  // prettier-ignore
  @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
  // prettier-ignore
  @include responsive('position', (xs: static, m: absolute));
  // prettier-ignore
  @include responsive('top', (m: 50%));
  // prettier-ignore
  @include responsive('left', (m: 50%));
  // prettier-ignore
  @include responsive('transform',  (xs: none, m: translate(-50%, -50%)));

  max-width: rem(800px);

  .homepage-description {
    // prettier-ignore
    @include responsive('margin', (xs: rem(0), m: 0));
    // prettier-ignore
    @include responsive('padding', (xs: rem(0 0 0 1rem)));
    // prettier-ignore
    @include responsive('width', (xs: 90%));
  }

  p {
    // prettier-ignore
    @include responsive('text-align', (xs: left, m: left));
    // prettier-ignore
    @include responsive('font-size', (xs: rem(20px), m: rem(24px)));
  }

  h1 {
    z-index: 2;
  }

  h2 {
    z-index: 1;
  }

  figure {
    // prettier-ignore
    @include responsive('width', (xs: rem(100px), m: rem(140px)));

    left: rem(20px);
    position: relative;
    top: rem(20px);

    img {
      border: 5px solid $white;
      border-radius: 100%;
    }
  }
}
</style>
