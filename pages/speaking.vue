<template>
  <div class="content-wrapper speaking">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="$prismic.asText(document.title)"
        :uppercase="true"
      />

      <h3 class="post-title-sep">
        {{ $prismic.asText(document.upcoming_talks) }}
      </h3>

      <div v-if="upcomingTalks.length > 0" class="posts">
        <talk v-for="talk in upcomingTalks" :key="talk.uid" :talk="talk.data" />
      </div>

      <p v-else class="no-upcoming-talks">
        {{ $prismic.asText(document.no_upcoming) }}
      </p>

      <h3 class="post-title-sep">
        {{ $prismic.asText(document.older_talks) }}
      </h3>

      <div class="posts">
        <talk v-for="talk in oldTalks" :key="talk.uid" :talk="talk.data" />
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '../assets/prismic/mapMetaInfo'

export default {
  async asyncData({ $prismic, error }) {
    try {
      const document = (await $prismic.api.getSingle('speaking')).data

      const talks = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'talk'),
        { orderings: '[my.talk.publication_date desc]' }
      )

      const oldTalks = []
      const upcomingTalks = []

      const isDateBeforeToday = (date) => {
        return (
          new Date(date.toDateString()) < new Date(new Date().toDateString())
        )
      }

      talks.results.forEach((talk) => {
        if (isDateBeforeToday(new Date(talk.data.date))) {
          oldTalks.push(talk)
        } else {
          upcomingTalks.push(talk)
        }
      })

      oldTalks.sort((a, b) => {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      })

      upcomingTalks.sort((a, b) => {
        return new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
      })

      return {
        document,
        oldTalks,
        upcomingTalks,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  metaInfo() {
    return mapMetaInfo(this.talks.data, 'speaking', this.$router.currentRoute)
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
