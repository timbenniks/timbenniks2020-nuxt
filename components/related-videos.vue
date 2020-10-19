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
          <lazy-image
            ratio="16/9"
            :alt="$prismic.asText(video.data.title)"
            :url="video.data.image.url"
            :widths="[300, 400, 500, 600, 680]"
            sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
          />
        </nuxt-link>

        <div class="post-content-wrap">
          <p class="post-title">
            <nuxt-link :to="`/videos/${video.uid}/`">
              {{ $prismic.asText(video.data.title) }}
            </nuxt-link>
          </p>
          <p class="post-tags">
            <span v-for="(tag, index) in video.tags" :key="tag">
              {{ tag }}
              <template v-if="index + 1 < video.tags.length">, </template>
            </span>
          </p>
          <p class="post-date">
            {{ asDay(video.data.publication_date) }}
            {{ asMonth(video.data.publication_date) }}
            {{ asYear(video.data.publication_date) }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { asDay, asMonth, asYear } from '../assets/prismic/helpers'

export default {
  name: 'RelatedVideos',
  props: {
    relatedVideos: { type: Object, required: true },
    currentVideo: { type: Object, required: true },
  },
  computed: {
    videos() {
      return this.relatedVideos.results
        .filter((video) => video.uid !== this.currentVideo)
        .slice(0, 3)
    },
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
