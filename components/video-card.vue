<template>
  <article :key="video.slug" class="post video">
    <nuxt-link :to="`/videos/${video.slug}/`">
      <lazy-img ratio="16/9" :alt="video.title" :url="video.image" sizes="sm:100vw md:320px" />
    </nuxt-link>

    <div class="post-content-wrap">
      <h4 class="post-title">
        <nuxt-link :to="`/videos/${video.slug}/`">
          {{ video.title }}
        </nuxt-link>
      </h4>
      <p class="post-tags">
        <span v-for="(tag, index) in video.tags" :key="tag">
          {{ tag }}
          <template v-if="index + 1 < video.tags.length">, </template>
        </span>
      </p>
      <p class="post-date">
        {{ video.day }}
        {{ video.month }}
        {{ video.year }}
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import LazyImg from './lazy-img.vue';
import { defineComponent, PropType } from '@vue/composition-api';
import { Video } from '~/types';

export default defineComponent({
  components: {
    LazyImg,
  },
  props: {
    video: {
      type: Object as PropType<Video>,
      required: true,
    },
  },
});
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
