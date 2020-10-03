<template>
  <article :key="video.slug" class="post video">
    <nuxt-link :to="`/videos/${video.slug}/`">
      <lazy-image
        ratio="16/9"
        :alt="video.title"
        :url="video.image"
        :widths="[300, 400, 500, 600, 680]"
        sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
      />
    </nuxt-link>

    <div class="post-content-wrap">
      <p class="post-title">
        <nuxt-link :to="`/videos/${video.slug}/`">
          {{ video.title }}
        </nuxt-link>
      </p>
      <p class="post-tags">
        <span v-for="(tag, index) in video.tags" :key="tag">
          {{ tag }}
          <template v-if="index + 1 < video.tags.length">, </template>
        </span>
      </p>
      <p class="post-date">
        {{ asDay(video.publication_date) }}
        {{ asMonth(video.publication_date) }}
        {{ asYear(video.publication_date) }}
      </p>
    </div>
  </article>
</template>

<script>
import { asDay, asMonth, asYear } from '../assets/prismic/helpers'
import LazyImage from './lazy-image.vue'

export default {
  name: 'VideoCard',
  components: {
    LazyImage,
  },
  props: {
    video: { type: Object, required: true },
  },
  methods: {
    asDay,
    asMonth,
    asYear,
  },
}
</script>

<style lang="scss" scoped>
.video {
  flex-direction: column;
  margin: 0;
  width: auto;

  figure {
    float: none;
    height: auto;
    margin: rem(0 0 16px 0);
    width: 100%;
  }

  .post-tags {
    color: $blue-light;
    font-size: 0.8rem;
    font-weight: 400;
    margin: rem(0 0 10px 0);
    text-transform: uppercase;
  }

  .post-date {
    float: none;
    font-size: rem(13px);
    margin: 0;
    text-align: left;
    background: $yellow;
    display: inline-block;
    color: #000;
    padding: rem(2px 4px);
  }

  .post-title {
    font-size: 1rem;
    line-height: 1.3;
  }
}
</style>
