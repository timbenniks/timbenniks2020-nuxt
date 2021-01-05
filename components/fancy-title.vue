<template>
  <div
    :is="tag"
    class="fancy-title relative z-1 inline-block py-1 px-2 font-black"
    :class="[color, type, { uppercase }]"
    :style="{ top: `${offset[0]}rem`, left: `${offset[1]}rem` }"
  >
    {{ field }}
  </div>
</template>

<script>
export default {
  name: 'FancyTitle',
  props: {
    field: { type: [Array, String], required: true },
    tag: { type: String, required: false, default: 'h1' },
    color: { type: String, required: false, default: 'blue-main' },
    type: { type: String, required: false, default: 'large' },
    uppercase: { type: Boolean, required: false, default: true },
    offset: { type: Array, required: false, default: () => [0, 0] },
  },
}
</script>

<style lang="postcss">
.fancy-title:before {
  content: '';
  @apply absolute w-full h-full block top-0 left-0 z-n1 -skew-x-3;
}

.fancy-title.blue-main:before {
  @apply bg-blue-main;
}

.fancy-title.red:before {
  @apply bg-red;
}

.fancy-title.blue-dark:before {
  @apply bg-blue-dark;
}

.fancy-title.yellow {
  @apply text-black;
}

.fancy-title.yellow:before {
  @apply bg-yellow;
}

.fancy-title.large {
  @apply text-base sm:text-2xl m:text-3xl;
  line-height: 1.2;
}

.fancy-title.small {
  @apply text-base sm:text-lg m:text-2xl;
  line-height: 1.2;
}
</style>
