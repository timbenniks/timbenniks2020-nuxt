<template>
  <div class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <div class="hero-banner">
        <lazy-image
          ratio="16/9"
          :alt="document.heroimage.alt"
          :url="document.heroimage.url"
          extra-class="opacity-only"
          :caption="false"
          :widths="[375, 500, 768, 1024, 1440, 1600]"
          sizes="100vw"
          loading-type="eager"
        />

        <div class="hero-banner-content">
          <lazy-image
            ratio="1/1"
            :alt="$prismic.asText(document.main_title)"
            :url="document.image.url"
            extra-class="opacity-only"
            :caption="false"
            :widths="[200]"
            sizes="200px"
          />

          <fancy-title
            :field="$prismic.asText(document.main_title)"
            tag="h1"
            color="red"
            type="large"
            :offset="[0, 0.5]"
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
        </div>
      </div>
      <div class="homepage-content">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="homepage-description"
          v-html="$prismic.asHtml(document.description)"
        ></div>
        <!--eslint-enable-->
      </div>
    </main>
  </div>
</template>

<script>
import LinkMixin from '@/assets/mixins/linkMixin'
import mapMetaInfo from '@/assets/prismic/mapMetaInfo'

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
.home {
  main {
    padding: 0;
    max-width: rem(1600px);
    width: 100%;
    margin: 0 auto;
  }
}

.homepage-description {
  // prettier-ignore
  @include responsive('margin', (xs: rem(0), m: 0));
  // prettier-ignore
  @include responsive('padding', (xs: rem(0 0 0 1rem)));
  // prettier-ignore
  @include responsive('width', (xs: 90%));

  p {
    // prettier-ignore
    @include responsive('text-align', (xs: left, m: left));
    // prettier-ignore
    @include responsive('font-size', (xs: rem(20px), m: rem(24px)));
  }

  display: none;
}

.hero-banner {
  position: relative;
  border-bottom: rem(2px solid $blue-main);
}

.hero-banner-content {
  // prettier-ignore
  @include responsive('width', (xs: 90%, sm: 80%));
  // prettier-ignore
  @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
  // prettier-ignore
  @include responsive('bottom', (xs: -44px, m: -55px));
  // prettier-ignore
  @include responsive('left', (xs: 2%));

  position: absolute;
  max-width: rem(800px);

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
