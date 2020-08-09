<template>
  <div class="content-wrapper home">
    <navigation />

    <main id="main-content">
      <home-hero-banner :data="heroBannerData" />

      <div class="homepage-content">
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
}
</style>
