<template>
  <div class="wrapper">
    <a
      href="#main-content"
      aria-hidden="false"
      class="skip-to-content cursor-pointer left-1/2 -translate-x-0.5 absolute h-0 overflow-hidden text-white uppercase bg-blue-main no-underline px-1 -top-32 py-0.5 hover:bg-white text-blue-main"
    >
      Skip to content
    </a>
    <div class="bg-triangle bottom-0 h-full fixed right-0 w-full z-n1" />
    <Nuxt />

    <global-footer
      v-if="
        $route.name !== 'startpage' &&
        $route.name !== 'invoices-invoice' &&
        $route.name !== 'index'
      "
    />
  </div>
</template>

<style lang="postcss">
.bg-triangle {
  background: linear-gradient(to bottom right, transparent 50%, #3671cd 50%)
    bottom right/175px 175px no-repeat;
}

@media (min-width: 1024px) {
  .bg-triangle {
    background: linear-gradient(to bottom right, transparent 50%, #3671cd 50%)
      bottom right/400px 400px no-repeat;
  }
}

.skip-to-content {
  &:active,
  &:focus {
    @apply absolute left-1/2 -translate-x-0.5 z-50 top-5 h-auto;
  }
}
</style>
