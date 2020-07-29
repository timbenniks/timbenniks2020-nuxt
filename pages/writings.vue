<template>
  <div class="content-wrapper writings">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="$prismic.asText(document.title)"
        :uppercase="true"
      />

      <div class="posts">
        <article v-for="post in writings" :key="post.uid" class="post">
          <nuxt-link :to="`/writings/${post.uid}/`">
            <lazy-image
              ratio="16/9"
              :alt="$prismic.asText(post.data.title)"
              :url="post.data.image.url"
              :caption="false"
              :widths="[300, 400, 500, 600, 680]"
              sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
            />
          </nuxt-link>

          <div class="post-content-wrapper">
            <p class="post-title fancy-title red">
              <nuxt-link :to="`/writings/${post.uid}/`">
                {{ $prismic.asText(post.data.title) }}
              </nuxt-link>
            </p>
            <p class="post-description">
              <span class="post-date">
                {{ asDay(post.data.publication_date) }}
                {{ asMonth(post.data.publication_date) }}
                {{ asYear(post.data.publication_date) }}
              </span>
              &mdash; {{ $prismic.asText(post.data.sub_title) }}
            </p>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '../assets/prismic/mapMetaInfo'
import { asDay, asMonth, asYear } from '../assets/prismic/helpers'

export default {
  async asyncData({ $prismic, error }) {
    try {
      const document = (await $prismic.api.getSingle('writings')).data

      const writings = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'writing'),
        { orderings: '[my.writing.publication_date desc]' }
      )

      return {
        document,
        writings: writings.results,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    asDay,
    asMonth,
    asYear,
  },
  head() {
    return mapMetaInfo(this.document, 'writings', this.$router.currentRoute)
  },
}
</script>

<style lang="scss" scoped>
.post-date {
  float: none;
  font-weight: 400;
  margin: 0;
}
</style>
