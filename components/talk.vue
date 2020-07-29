<template>
  <article class="post speaking">
    <div class="post-date">
      <span class="post-date-day">{{ asDay(talk.date) }}</span>
      <span class="post-date-month">{{ asMonth(talk.date) }}</span>
      <span class="post-date-year">{{ asYear(talk.date) }}</span>
    </div>
    <div class="post-content-wrapper">
      <div class="post-titles">
        <p class="post-title fancy-title red">
          <a :href="asLink(talk.link_to_event)" target="_blank" rel="noopener">
            {{ $prismic.asText(talk.title) }}
          </a>
        </p>
        <p class="post-subject">
          <span class="post-location">{{ talk.location }}</span> &mdash;
          {{ talk.subject }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { asLink, asDay, asMonth, asYear } from '../assets/prismic/helpers'

export default {
  name: 'Talk',
  props: {
    talk: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    asDay,
    asMonth,
    asYear,
    asLink,
  },
}
</script>

<style lang="scss">
.post.speaking {
  flex-direction: row;

  .post-date {
    flex: 1;
  }

  .post-content-wrapper {
    flex: 11;
  }
}
</style>
