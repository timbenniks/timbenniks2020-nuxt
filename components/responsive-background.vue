<template>
  <div
    role="img"
    :aria-label="alt"
    class="responsive-background"
    :class="animationClass"
    :style="{ backgroundImage: backgroundImage, '--aspect-ratio': ratio }"
  />
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
      ratio: '16/9',
      animationClass: '',
    }
  },
  mounted() {
    this.backgroundImage = `url('${this.getBackground().url}')`
    this.ratio = this.getBackground().ratio
    this.animationClass = 'scale-out'

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

<style lang="scss">
.responsive-background {
  transform: scale(1.02);
  transition: transform 2s ease-out;
}

.scale-out {
  transform: scale(1);
}
</style>
