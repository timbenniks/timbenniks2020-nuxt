<template>
  <div class="videos-list top-videos">
    <fancy-title
      tag="h3"
      :field="data.title"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <!-- eslint-disable vue/no-v-html -->
    <div class="top-videos-intro" v-html="data.intro" />
    <!--eslint-enable-->

    <div class="videos">
      <video-card
        v-for="video in data.videos"
        :key="video.slug"
        :video="video"
      />
    </div>

    <p class="top-videos-load-more">
      <nuxt-link class="load-more" to="/videos">See all Videos</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeTopVideos',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.top-videos {
  margin: rem(0 0 50px 0);

  .videos {
    margin: rem(0 0 16px 0);
  }

  .top-videos-load-more {
    text-align: right;

    .load-more {
      display: inline-block;
      margin: 0;
    }
  }
}
</style>
