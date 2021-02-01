<template>
  <div class="sponsor mb-10" :class="align">
    <a
      href="https://www.buymeacoffee.com/timbenniks"
      target="_blank"
      rel="noopener"
      class="inline-block"
      @click="$ga.event('sponsor', 'click', 'component', 'bmac image')"
    >
      <figure style="--aspect-ratio: 217/60" class="w-44 mb-2">
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
      let cssclass = 'text-center	'

      if (this.alignment === 'left') {
        cssclass = 'text-left'
      }

      return cssclass
    },
  },
}
</script>
