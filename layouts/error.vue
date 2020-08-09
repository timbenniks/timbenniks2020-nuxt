<template>
  <div class="wrapper">
    <a href="#main-content" aria-hidden="false" class="goToContent"
      >Skip to content</a
    >

    <div class="content-wrapper home">
      <navigation />

      <main id="main-content">
        <div class="homepage">
          <lazy-image
            ratio="1/1"
            alt="404 Page not Found"
            url="https://images.prismic.io/timbenniks/375f865f-188c-4f83-9462-c8600aff4061_favicon.png?auto=compress,format"
            extra-class="opacity-only"
            :caption="false"
            :widths="[200]"
            sizes="200px"
          />

          <div class="home-copy-wrapper">
            <fancy-title
              field="Oh oh. We don't seem to have this page"
              tag="h1"
              color="red"
              type="large"
              :offset="[0, 1]"
              :uppercase="true"
            />

            <fancy-title
              field="404 Error page not found"
              tag="h2"
              color="blue-main"
              type="small"
              :offset="[-0.18, 0]"
              :uppercase="true"
            />
          </div>

          <video playsinline src="goat.mp4" width="400" autoplay loop />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from '../components/navigation.vue'
import FancyTitle from '../components/fancy-title.vue'
import LazyImage from '../components/lazy-image.vue'

export default {
  components: {
    Navigation,
    LazyImage,
    FancyTitle,
  },
  metaInfo: {
    title: "Oh oh. We don't seem to have this page",
    description: '404 Error page not found',
  },
}
</script>

<style lang="scss">
.homepage {
  max-width: rem(800px);

  // prettier-ignore
  @include responsive('width', (xs: 100%, m: 80%));
  // prettier-ignore
  @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
  // prettier-ignore
  @include responsive('position', (xs: static, m: absolute));
  // prettier-ignore
  @include responsive('top', (m: 50%));
  // prettier-ignore
  @include responsive('left', (m: 50%));
  // prettier-ignore
  @include responsive('transform',  (xs: none, m: translate(-50%, -50%)));

  .homepage-description {
    // prettier-ignore
    @include responsive('margin', (xs: rem(0), m: 0));
    // prettier-ignore
    @include responsive('padding', (xs: rem(0 0 0 1rem)));
    // prettier-ignore
    @include responsive('width', (xs: 90%));
  }

  p {
    // prettier-ignore
    @include responsive('text-align', (xs: left, m: left));
    // prettier-ignore
    @include responsive('font-size', (xs: rem(20px), m: rem(24px)));
  }

  h1 {
    z-index: 2;
  }

  h2 {
    z-index: 1;
  }

  figure {
    position: relative;
    top: rem(20px);
    left: rem(20px);

    // prettier-ignore
    @include responsive('width', (xs: rem(100px), m: rem(140px)));

    img {
      border-radius: 100%;
      border: 5px solid $white;
    }
  }

  video {
    width: 100%;
    //max-width: rem(500px);
    border: 2px solid $blue-light;
  }
}
</style>
