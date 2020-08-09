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
    <article :key="data.uid" class="post">
      <nuxt-link :to="`/writings/${data.uid}/`">
        <lazy-image
          ratio="16/9"
          :alt="$prismic.asText(data.data.title)"
          :url="data.data.image.url"
          :caption="false"
          :widths="[300, 400, 500, 600, 680, 768, 1024]"
          sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
        />
      </nuxt-link>

      <div class="post-content-wrapper">
        <p class="post-title fancy-title red">
          <nuxt-link :to="`/writings/${data.uid}/`">
            {{ $prismic.asText(data.data.title) }}
          </nuxt-link>
        </p>
        <p class="post-description">
          <span class="post-date">
            {{ asDay(data.data.publication_date) }}
            {{ asMonth(data.data.publication_date) }}
            {{ asYear(data.data.publication_date) }}
          </span>
          &mdash; {{ $prismic.asText(data.data.sub_title) }}
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
      type: Object,
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
