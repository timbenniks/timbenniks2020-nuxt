<template>
  <div
    class="hero-banner relative border-b-2 border-blue-light w-full overflow-hidden"
  >
    <div class="hero-banner-inner absolute top-0 left-0 right-0 bottom-0">
      <lazy-hero-picture
        v-if="data.banner_image.url"
        :alt="data.banner_image.alt"
        :url="data.banner_image.url"
      />

      <div
        class="hero-banner-content w-11/12 mt-11 mx-auto bottom-2 absolute max-w-lg sm:w-4/5 m:m-0"
      >
        <lazy-image
          ratio="1/1"
          :alt="data.logo.alt"
          :url="data.logo.url"
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

<style lang="postcss">
.hero-banner:before {
  @apply block w-full pt-16/9 l:pt-22/9;
  content: '';
}

.hero-banner-inner img {
  @apply w-full;
}

.hero-banner-content {
  left: 2%;
}

.hero-banner-content h1 {
  @apply z-20;
}

.hero-banner-content h2 {
  @apply z-10;
}

.hero-banner-content figure {
  @apply w-24 m:w-36 left-5 relative top-5;
}

.hero-banner-content img {
  @apply border-4 border-white rounded-full;
}
</style>
