<template>
  <div class="videos-list top-videos">
    <fancy-title
      tag="h3"
      :field="$prismic.asText(data.primary.top_videos_list)"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <div class="videos">
      <video-card v-for="video in videos" :key="video.slug" :video="video" />
    </div>
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

  computed: {
    videos() {
      return this.data.items.map((item) => {
        return {
          slug: item.video.uid,
          title: this.$prismic.asText(item.video.data.title),
          image: item.video.data.image.url,
          publication_date: item.video.data.publication_date,
          tags: item.video.tags,
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.top-videos {
  margin: rem(100px auto 0);
}
</style>
