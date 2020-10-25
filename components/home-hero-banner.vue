<template>
  <div class="hero-banner">
    <div class="hero-banner-inner">
      <lazy-hero-picture
        v-if="data.banner_image.url"
        :alt="data.banner_image.alt"
        :url="data.banner_image.url"
      />

      <div class="hero-banner-content">
        <lazy-image
          ratio="1/1"
          :alt="data.logo.alt"
          :url="data.logo.url"
          extra-class="opacity-only"
          :caption="false"
          :widths="[271]"
          sizes="271px"
        />

        <fancy-title
          :field="data.title"
          tag="h1"
          color="red"
          type="large"
          :offset="[0, 0.5]"
          :uppercase="true"
        />

        <fancy-title
          :field="data.subtitle"
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
}
</script>

<style lang="scss">
.hero-banner {
  position: relative;
  border-bottom: rem(2px solid $blue-main);
  width: 100%;
  overflow: hidden;

  &:before {
    display: block;
    content: '';
    width: 100%;

    // prettier-ignore
    @include responsive('padding-top', (xs: (9 / 16) * 100%, l: (9 / 22) * 100%));
  }

  > .hero-banner-inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .hero-banner-content {
    // prettier-ignore
    @include responsive('width', (xs: 90%, sm: 80%));
    // prettier-ignore
    @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
    // prettier-ignore
    @include responsive('bottom', (xs: -16px, m: -16px));
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
