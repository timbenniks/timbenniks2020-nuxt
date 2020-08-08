<template>
  <div class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <div class="hero-banner">
        <div class="hero-banner-inner">
          <responsive-background
            :alt="document.heroimage.alt"
            :backgrounds="backgrounds"
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
      </div>

      <div class="homepage-content">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="homepage-description"
          v-html="$prismic.asHtml(document.description)"
        ></div>

        <pre>
        {{ homestuff }}
        </pre>
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

      const graphQuery = `
      {
        home {
          body {
            ...on general_card {
              non-repeat {
                ...non-repeatFields
              }
            }
            ...on twitter_card {
              non-repeat {
                ...non-repeatFields
              }
            }
          }
          body1 {
            ...on hero_banner {
              non-repeat {
                ...non-repeatFields
              }
            }
            ...on top_videos {
              non-repeat {
                ...non-repeatFields
              }
              repeat {
                ...repeatFields
              }
            }
          }
        }
      }`

      const homestuff = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'home'),
        { graphQuery }
      )

      return {
        document,
        homestuff,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    backgrounds() {
      const baseUrl = this.document.heroimage.url.replace(
        '?auto=compress,format',
        ''
      )

      const baseOptions = {
        crop: 'scale',
        quality: 'auto',
        fetchFormat: 'auto',
      }

      return [
        {
          width: 0,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 375,
          }),
          ratio: '16/9',
        },
        {
          width: 375,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 500,
          }),
          ratio: '16/9',
        },
        {
          width: 500,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 768,
          }),
          ratio: '16/9',
        },
        {
          width: 768,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1280,
          }),
          ratio: '16/9',
        },
        {
          width: 1024,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1280,
          }),
          ratio: '18/9',
        },
        {
          width: 1280,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1440,
          }),
          ratio: '20/9',
        },
        {
          width: 1440,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1600,
          }),
          ratio: '21/9',
        },
      ]
    },
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
    max-width: rem(1440px);
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
}

.hero-banner {
  position: relative;
  border-bottom: rem(2px solid $blue-main);
  width: 100%;

  &:before {
    display: block;
    content: '';
    width: 100%;

    // prettier-ignore
    @include responsive('padding-top', (xs: (9 / 16) * 100%, l: (9 / 18) * 100%, xl: (9 / 20) * 100%, xxl: (9 / 21) * 100%));
  }

  > .hero-banner-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .responsive-background {
    background-repeat: no-repeat;
    background-size: cover;
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
}
</style>
