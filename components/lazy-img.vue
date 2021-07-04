<template>
  <figure :style="`--aspect-ratio:${ratio};`">
    <nuxt-img
      :src="cleanUrl"
      :alt="alt"
      :sizes="sizes"
      provider="cloudinary"
      :loading="loadingType"
      :width="parseRatioForWH(ratio, 'width')"
      :height="parseRatioForWH(ratio, 'height')"
    />

    <figcaption v-if="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  props: {
    ratio: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    sizes: { type: String, required: false, default: '' },
    caption: { type: Boolean, required: false, default: false },
    loadingType: { type: String, required: false, default: 'lazy' },
  },
  setup(props) {
    const cleanUrl = computed(() => {
      return props.url.replace('?auto=compress,format', '');
    });

    const parseRatioForWH = (ratio: string, which: string) => {
      return Number(ratio.split('/')[which === 'width' ? 0 : 1]) * 10;
    };

    return {
      cleanUrl,
      parseRatioForWH,
    };
  },
});
</script>
