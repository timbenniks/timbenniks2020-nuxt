<template>
  <figure :style="`--aspect-ratio:${ratio};`">
    <img
      v-if="nativeLazySupported"
      :srcset="generateSrcSet()"
      :alt="alt"
      :title="alt"
      :sizes="sizes"
      :loading="loadingType"
      :width="parseRatioForWH(ratio, 'width')"
      :height="parseRatioForWH(ratio, 'height')"
    />
    <img
      v-else
      :data-srcset="generateSrcSet()"
      :alt="alt"
      :src="preload"
      :title="alt"
      :data-sizes="sizes"
      :class="extraClass"
      class="lazy"
    />
    <figcaption v-if="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script>
import {
  loadImages,
  getSrcSet,
  nativeLazySupported,
} from '../assets/prismic/imageTools'

export default {
  name: 'LazyImage',
  props: {
    ratio: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    sizes: { type: String, required: false, default: '' },
    widths: { type: Array, required: true },
    caption: { type: Boolean, required: false, default: false },
    extraClass: { type: String, required: false, default: '' },
    loadingType: { type: String, required: false, default: 'lazy' },
    preload: {
      type: String,
      required: false,
      default:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
  },
  data() {
    return {
      nativeLazySupported,
    }
  },
  mounted() {
    loadImages()
  },
  methods: {
    parseRatioForWH(ratio, which) {
      return Number(ratio.split('/')[which === 'width' ? 0 : 1]) * 10
    },
    generateSrcSet() {
      return getSrcSet(this.url, this.widths, this.$cloudinary)
    },
  },
}
</script>
