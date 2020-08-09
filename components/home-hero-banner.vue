<template>
  <div class="hero-banner">
    <div class="hero-banner-inner">
      <responsive-background
        :alt="data.banner_image.alt"
        :backgrounds="backgrounds"
      />

      <div class="hero-banner-content">
        <lazy-image
          ratio="1/1"
          :alt="data.logo.alt"
          :url="data.logo.url"
          extra-class="opacity-only"
          :caption="false"
          :widths="[200]"
          sizes="200px"
        />

        <fancy-title
          :field="$prismic.asText(data.title)"
          tag="h1"
          color="red"
          type="large"
          :offset="[0, 0.5]"
          :uppercase="true"
        />

        <fancy-title
          :field="$prismic.asText(data.subtitle)"
          tag="h2"
          color="blue-main"
          type="small"
          :offset="[-0.18, 0]"
          :uppercase="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeroBanner',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    backgrounds() {
      const baseUrl = this.data.banner_image.url.replace(
        '?auto=compress,format',
        ''
      )

      const baseOptions = {
        crop: 'scale',
        quality: 'auto',
        fetchFormat: 'auto',
      }

      return [
        {
          width: 0,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 375,
          }),
          ratio: '16/9',
        },
        {
          width: 375,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 500,
          }),
          ratio: '16/9',
        },
        {
          width: 500,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 768,
          }),
          ratio: '16/9',
        },
        {
          width: 768,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1280,
          }),
          ratio: '16/9',
        },
        {
          width: 1024,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1280,
          }),
          ratio: '18/9',
        },
        {
          width: 1280,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1440,
          }),
          ratio: '20/9',
        },
        {
          width: 1440,
          url: this.$cloudinary().fetchRemote(baseUrl, {
            ...baseOptions,
            width: 1600,
          }),
          ratio: '21/9',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.hero-banner {
  position: relative;
  border-bottom: rem(2px solid $blue-main);
  width: 100%;

  &:before {
    display: block;
    content: '';
    width: 100%;

    // prettier-ignore
    @include responsive('padding-top', (xs: (9 / 16) * 100%, l: (9 / 18) * 100%, xl: (9 / 20) * 100%, xxl: (9 / 21) * 100%));
  }

  > .hero-banner-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .responsive-background {
    background-repeat: no-repeat;
    background-size: cover;
  }

  .hero-banner-content {
    // prettier-ignore
    @include responsive('width', (xs: 90%, sm: 80%));
    // prettier-ignore
    @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
    // prettier-ignore
    @include responsive('bottom', (xs: -44px, m: -55px));
    // prettier-ignore
    @include responsive('left', (xs: 2%));

    position: absolute;
    max-width: rem(800px);

    h1 {
      z-index: 2;
    }

    h2 {
      z-index: 1;
    }

    figure {
      // prettier-ignore
      @include responsive('width', (xs: rem(100px), m: rem(140px)));

      left: rem(20px);
      position: relative;
      top: rem(20px);

      img {
        border: 5px solid $white;
        border-radius: 100%;
      }
    }
  }
}
</style>
