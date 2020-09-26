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
        <home-latest-writing :data="latestWriting.results[0]" />
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

      const latestWriting = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'writing'),
        { pageSize: 1, orderings: '[my.writing.publication_date desc]' }
      )

      return {
        document,
        heroBannerData,
        topVideosData,
        latestWriting,
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
    max-width: rem(1100px);
    padding: rem(0 16px);
    margin: rem(30px auto);

    .homepage-introduction {
      margin: 0 auto 5rem;
      max-width: rem(800px);
      text-align: center;

      p {
        margin: 0;
        // prettier-ignore
        @include responsive('font-size', ( xs: rem(18px), m: rem(24px) ));
      }
    }
  }
}
</style>
