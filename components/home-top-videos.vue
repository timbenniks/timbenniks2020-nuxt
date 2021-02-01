<template>
  <div class="mb-20">
    <fancy-title
      tag="h3"
      :field="data.title"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <!-- eslint-disable vue/no-v-html -->
    <div class="my-2" v-html="data.intro" />
    <!--eslint-enable-->

    <div class="mb-4 grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-4">
      <video-card
        v-for="video in data.videos"
        :key="video.slug"
        :video="video"
        class="bg-blue-item p-4 border-b-2 border-blue-main flex flex-col"
        @click="$ga.event('home-top-vidoes', 'click', video.slug)"
      />
    </div>

    <p>
      <nuxt-link to="/videos">See all Videos</nuxt-link>
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
