<template>
  <div class="sponsor" :class="align">
    <a href="https://www.buymeacoffee.com/timbenniks" target="_blank" rel="noopener">
      <figure style="--aspect-ratio: 217/60">
        <nuxt-img src="/default-white.png" alt="Buy Me A Coffee" loading="lazy" width="217" height="60" />
      </figure>
    </a>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  props: {
    alignment: {
      type: String,
      required: false,
      default: 'center',
    },
  },
  // do not destructiore props. It will loose reactivity
  setup(props) {
    const align = computed(() => {
      let cssclass: string = 'centered';

      if (props.alignment === 'left') {
        cssclass = 'left-aligned';
      }

      return cssclass;
    });

    return {
      align,
    };
  },
});
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
