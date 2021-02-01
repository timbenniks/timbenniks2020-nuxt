<template>
  <article :key="video.slug" class="w-auto">
    <nuxt-link :to="`/videos/${video.slug}/`">
      <lazy-image
        ratio="16/9"
        :alt="video.title"
        :url="video.image"
        :widths="[350, 450, 550, 600, 680, 750, 800]"
        sizes="(max-width: 400px) 100vw, (min-width: 700px) 320px"
        class="h-auto w-full mb-4 border-b-2 border-blue-main"
      />
    </nuxt-link>
    <div class="card-content">
      <p class="leading-tight mb-2">
        <nuxt-link
          :to="`/videos/${video.slug}/`"
          class="text-white no-underline font-bold"
        >
          {{ video.title }}
        </nuxt-link>
      </p>
      <p class="uppercase text-blue-light text-xs mb-4">
        <span v-for="(tag, index) in video.tags" :key="tag"
          >{{ tag
          }}<template v-if="index + 1 < video.tags.length">, </template></span
        >
      </p>
      <p
        class="bg-yellow text-black px-2 py-1 text-sm inline-block font-bold uppercase"
      >
        {{ video.day }}
        {{ video.month }}
        {{ video.year }}
      </p>
    </div>
  </article>
</template>

<script>
import LazyImage from './lazy-image.vue'

export default {
  name: 'VideoCard',
  components: {
    LazyImage,
  },
  props: {
    video: { type: Object, required: true },
  },
}
</script>
