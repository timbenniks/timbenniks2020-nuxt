<template>
  <div class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <home-hero-banner :data="heroBannerData" />

      <div class="homepage-content">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="homepage-introduction"
          v-html="$prismic.asHtml(document.data.description)"
        />
        <!--eslint-enable-->

        <home-top-videos :data="topVideosData" />
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
      const graphQuery = `
      {
        home {
          ...homeFields
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
                video {
                  ...on video {
                    ...videoFields
                  }
                }
              }
            }
          }
        }
      }`

      const document = await $prismic.api.getSingle('home', { graphQuery })

      const heroBannerData = document.data.body1.find(
        (slice) => slice.slice_type === 'hero_banner'
      ).primary

      const topVideosData = document.data.body1.find(
        (slice) => slice.slice_type === 'top_videos'
      )

      return {
        document,
        heroBannerData,
        topVideosData,
      }
    } catch (e) {
      error({ statusCode: 500, message: 'Something went wrong...' })
    }
  },

  head() {
    return mapMetaInfo(this.document.data, 'home', this.$router.currentRoute)
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

  .homepage-content {
    max-width: 800px;
    padding: rem(0 16px);

    // prettier-ignore
    @include responsive('margin', ( xs: rem(50px auto), m: rem(80px auto) ));

    .homepage-introduction {
      margin: 0 0 3rem 0;

      p {
        margin: 0;
        // prettier-ignore
        @include responsive('font-size', ( xs: rem(18px), m: rem(24px) ));
      }
    }
  }
}
</style>
