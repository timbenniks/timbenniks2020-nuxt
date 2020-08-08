<template>
  <div
    role="img"
    :aria-label="alt"
    class="responsive-background"
    :style="{ backgroundImage: backgroundImage }"
  ></div>
</template>

<script>
export default {
  name: 'ResponsiveBackground',
  props: {
    alt: { type: String, required: true },
    backgrounds: { type: Object, required: true },
  },
  data() {
    return {
      backgroundImage:
        'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
    }
  },
  mounted() {
    this.backgroundImage = `url('${this.getBackground()}')`

    window.addEventListener('resize', () => {
      this.backgroundImage = `url('${this.getBackground()}')`
    })
  },
  methods: {
    getBackground() {
      const windowWidth = document.documentElement.clientWidth
      const keys = Object.keys(this.backgrounds).reverse()
      const lastMatchingKey = keys.filter((key) => windowWidth >= key).shift()
      return this.backgrounds[lastMatchingKey]
    },
  },
}
</script>
