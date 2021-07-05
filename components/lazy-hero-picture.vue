<template>
  <picture>
    <source
      :srcset="generateSrcSet([1024, 1280, 1330, 1440, 1600], url, '22/9')"
      media="(min-width: 1024px)"
      sizes="100vw"
    />

    <source
      :srcset="generateSrcSet([320, 375, 460, 550, 600, 800, 900], url, '16/9')"
      media="(max-width: 1023px)"
      sizes="100vw"
    />

    <img
      :alt="alt"
      :src="preload"
      loading="eager"
      :width="parseRatioForWH('16/9', 'width')"
      :height="parseRatioForWH('16/9', 'height')"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { ImageOptions } from '~/types';

export default defineComponent({
  props: {
    alt: { type: String, required: true },
    url: { type: String, required: true },
    sizes: { type: String, required: false, default: '' },
    preload: {
      type: String,
      required: false,
      default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
  },
  setup() {
    const parseRatioForWH = (ratio: string, which: string) => {
      return Number(ratio.split('/')[which === 'width' ? 0 : 1]) * 10;
    };

    const concatCloudinaryUrl = (url: string, opts: ImageOptions) => {
      return `https://res.cloudinary.com/dwfcofnrd/image/fetch/ar_${opts.ratio},c_${opts.crop},f_auto,q_auto,w_${opts.width}/${url}`;
    };

    const generateSrcSet = (widths: any[], url: string, ratio: string) => {
      const cleanUrl = url.replace('?auto=compress,format', '');

      let srcset = '';

      widths.forEach((width: number) => {
        const url = concatCloudinaryUrl(cleanUrl, {
          crop: 'fill',
          width,
          ratio: ratio.replace('/', ':'),
        });
        srcset += `${url} ${width}w, `;
      });

      return srcset.slice(0, -2);
    };

    return {
      parseRatioForWH,
      concatCloudinaryUrl,
      generateSrcSet,
    };
  },
});
</script>
