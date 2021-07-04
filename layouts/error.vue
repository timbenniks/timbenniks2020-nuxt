<template>
  <div class="wrapper">
    <a href="#main-content" aria-hidden="false" class="goToContent">Skip to content</a>

    <div class="content-wrapper blogpost">
      <navigation />

      <main id="main-content">
        <heading
          title="Oh oh. We don't seem to have this page"
          subtitle="404 Error page not found"
          :breadcrumb="false"
          titletag="h1"
          subtitletag="h2"
          :use-fancy-titles="true"
        />

        <figure style="--aspect-ratio: 16/9" class="vid">
          <iframe
            width="16"
            height="9"
            allow="autoplay"
            allowfullscreen
            frameborder="0"
            loading="lazy"
            src="https://www.youtube.com/embed/8DZrK-2Z17A"
          />
        </figure>
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from '../components/navigation.vue';

export default {
  components: {
    Navigation,
  },
  head: {
    title: "Oh oh. We don't seem to have this page",
    description: '404 Error page not found',
  },
};
</script>

<style lang="scss">
.vid {
  margin: 0 auto;
  max-width: rem(800px);
  width: 90%;
}
</style>
