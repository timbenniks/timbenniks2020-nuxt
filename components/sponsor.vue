<template>
  <div class="sponsor" :class="align">
    <a
      href="https://www.buymeacoffee.com/timbenniks"
      target="_blank"
      rel="noopener"
    >
      <figure style="--aspect-ratio: 217/60">
        <img
          srcset="https://cdn.buymeacoffee.com/buttons/v2/default-white.png"
          alt="Buy Me A Coffee"
          title="Buy Me A Coffee"
          loading="lazy"
          width="217"
          height="60"
        />
      </figure>
    </a>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    alignment: { type: String, required: false, default: 'center' },
  },
  computed: {
    align() {
      let cssclass = 'centered'

      if (this.alignment === 'left') {
        cssclass = 'left-aligned'
      }

      return cssclass
    },
  },
}
</script>

<style lang="scss">
.sponsor {
  margin: rem(0 0 40px);

  &.left-aligned {
    text-align: left;
  }

  &.centered {
    text-align: center;
  }

  a {
    display: inline-block;
  }

  figure {
    width: 180px;
    margin: 0 0 0.6em 0;
  }

  p {
    font-size: 0.9em;
  }
}
</style>
