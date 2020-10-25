<template>
  <figure :style="`--aspect-ratio:${ratio};`">
    <img
      :srcset="generateSrcSet()"
      :alt="alt"
      :title="alt"
      :sizes="sizes"
      :loading="loadingType"
      :width="parseRatioForWH(ratio, 'width')"
      :height="parseRatioForWH(ratio, 'height')"
    />

    <figcaption v-if="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    ratio: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    sizes: { type: String, required: false, default: '' },
    widths: { type: Array, required: true },
    caption: { type: Boolean, required: false, default: false },
    loadingType: { type: String, required: false, default: 'lazy' },
  },
  methods: {
    parseRatioForWH(ratio, which) {
      return Number(ratio.split('/')[which === 'width' ? 0 : 1]) * 10
    },

    concatCloudinaryUrl(url, opts) {
      return `https://res.cloudinary.com/dwfcofnrd/image/fetch/ar_${opts.ratio},c_${opts.crop},f_auto,q_auto,w_${opts.width}/${url}`
    },

    generateSrcSet() {
      const cleanUrl = this.url.replace('?auto=compress,format', '')
      let srcset = ''

      this.widths.forEach((width) => {
        const opts = {
          crop: 'scale',
          width,
        }

        if (this.ratio) {
          opts.ratio = this.ratio.replace('/', ':')
          opts.crop = 'fill'
        }

        const url = this.concatCloudinaryUrl(cleanUrl, opts)
        srcset += `${url} ${width}w, `
      })

      return srcset.slice(0, -2)
    },
  },
}
</script>
