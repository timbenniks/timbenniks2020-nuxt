<template>
  <div
    role="img"
    :aria-label="alt"
    class="responsive-background"
    :style="{ backgroundImage: backgroundImage, '--aspect-ratio': ratio }"
  ></div>
</template>

<script>
export default {
  name: 'ResponsiveBackground',
  props: {
    alt: { type: String, required: true },
    backgrounds: { type: Array, required: true },
  },
  data() {
    return {
      backgroundImage:
        'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
      ratio: '1/1',
    }
  },
  mounted() {
    this.backgroundImage = `url('${this.getBackground().url}')`
    this.ratio = this.getBackground().ratio

    window.addEventListener('resize', () => {
      this.backgroundImage = `url('${this.getBackground().url}')`
      this.ratio = this.getBackground().ratio
    })
  },
  methods: {
    getBackground() {
      const windowWidth = document.documentElement.clientWidth

      return this.backgrounds
        .filter((bg) => windowWidth >= bg.width)
        .slice(-1)
        .pop()
    },
  },
}
</script>
