<template>
  <div
    :is="tag"
    class="fancy-title"
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
};
</script>
