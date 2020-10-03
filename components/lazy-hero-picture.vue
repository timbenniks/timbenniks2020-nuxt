<template>
  <figure :style="`--aspect-ratio:${ratio};`">
    <picture>
      <source
        :srcset="generateSrcSet([1024, 1280, 1330, 1440, 1600], url, '22/9')"
        media="(min-width: 1024px)"
        sizes="100vw"
      />

      <source
        :srcset="
          generateSrcSet([320, 375, 460, 550, 600, 800, 900], url, '16/9')
        "
        media="(max-width: 1023px)"
        sizes="100vw"
      />

      <img :alt="alt" :src="preload" loading="eager" />
    </picture>
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
    preload: {
      type: String,
      required: false,
      default:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
  },

  methods: {
    generateSrcSet(widths, url, ratio) {
      const cleanUrl = url.replace('?auto=compress,format', '')

      let srcset = ''

      widths.forEach((width) => {
        const url = this.$cloudinary().fetchRemote(cleanUrl, {
          crop: 'fill',
          width,
          quality: 'auto',
          fetchFormat: 'auto',
          aspectRatio: ratio.replace('/', ':'),
        })
        srcset += `${url} ${width}w, `
      })

      return srcset.slice(0, -2)
    },
  },
}
</script>
