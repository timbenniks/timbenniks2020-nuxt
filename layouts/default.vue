<template>
  <div class="wrapper">
    <a href="#main-content" aria-hidden="false" class="goToContent"
      >Skip to content</a
    >
    <div class="bg-triangle" />
    <Nuxt />
  </div>
</template>

<style lang="scss">
.bg-triangle {
  // prettier-ignore
  @include responsive(
    'background', (
      xs: linear-gradient(to bottom right, transparent 50%, $blue-main 50%) bottom right/175px 175px no-repeat,
      l: linear-gradient(to bottom right, transparent 50%, $blue-main 50%) bottom right/400px 400px no-repeat
    )
  );

  bottom: 0;
  height: 100%;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: -1;
}
</style>
