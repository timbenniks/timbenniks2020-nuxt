<template>
  <div class="videos-list">
    <fancy-title
      tag="h3"
      field="Related Videos"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />

    <div class="videos">
      <article v-for="video in videos" :key="video.uid" class="post video">
        <nuxt-link :to="`/videos/${video.uid}/`">
          <lazy-img ratio="16/9" :alt="video.title" :url="video.image" sizes="sm:100vw md:210px" />
        </nuxt-link>

        <div class="post-content-wrap">
          <p class="post-title">
            <nuxt-link :to="`/videos/${video.uid}/`">
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
            {{ video.day }}
            {{ video.month }}
            {{ video.year }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api';
import { Video } from '~/types';

export default defineComponent({
  props: {
    relatedVideos: {
      //type: Array as PropType<Array<Video>>,
      type: Array as PropType<Video[]>,
      required: true,
    },
    currentVideo: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const videos = computed(() => {
      return props.relatedVideos.filter((video: Video) => video.uid !== props.currentVideo).slice(0, 3);
    });

    return {
      videos,
    };
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
