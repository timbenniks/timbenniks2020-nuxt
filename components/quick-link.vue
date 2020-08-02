<template>
  <li class="quicklink">
    <a :href="url">
      <img :src="require(`../assets/images/${image}`)" />
      {{ label }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'QuickLink',
  props: {
    url: { type: String, required: true },
    image: { type: String, required: true },
    label: { type: String, required: true },
  },
  data() {
    return {
      imgUrl: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.quicklink {
  a {
    color: $white;
    display: inline-block;
    font-weight: 700;
    padding: rem(10px);
    text-decoration: none;
    text-transform: uppercase;
    transition: all 300ms ease;

    &:hover,
    &:focus {
      background: $blue-main;
      outline: none;
    }
  }

  img {
    background-size: 100% 100%;
    display: inline-block;
    height: auto;
    margin: rem(-4px 6px 0 0);
    vertical-align: middle;
    width: rem(18px);
  }
}
</style>
