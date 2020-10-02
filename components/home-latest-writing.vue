<template>
  <div class="home-latest-writing posts">
    <fancy-title
      tag="h3"
      field="Latest writing"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <article v-for="post in data" :key="post.uid" class="post">
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
</template>

<script>
import { asDay, asMonth, asYear } from '@/assets/prismic/helpers'

export default {
  name: 'HomeLatestWriting',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    asDay,
    asMonth,
    asYear,
  },
}
</script>

<style lang="scss">
.home-latest-writing {
  .fancy-title {
    margin: rem(0 0 30px 0);
  }
  .post {
    .post-title {
      margin: 0 0 0.375rem !important;
    }

    .post-date {
      margin: 0;
    }
  }
}
</style>
