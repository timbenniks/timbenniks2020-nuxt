<template>
  <nav
    class="navigation bg-blue-darker border-solid border-b-2 border-blue-alt left-0 min-h-header sticky top-0 w-full z-3"
    aria-label="Main Navigation"
  >
    <nuxt-link
      to="/"
      class="head-link flex left-2 absolute no-underline top-2 px-1 pt-1"
    >
      <lazy-image
        ratio="1/1"
        alt="Tim Benniks Logo"
        url="https://images.prismic.io/timbenniks/375f865f-188c-4f83-9462-c8600aff4061_favicon.png"
        :caption="false"
        :widths="[103]"
        sizes="103px"
        class="self-center block mr-2 w-10"
      />

      <span
        class="text-white text-base font-black self-center focus:outline-a11y"
      >
        TIM BENNIKS
      </span>
    </nuxt-link>

    <button
      id="button"
      :class="{ 'is-active': burgerActive }"
      :aria-expanded="burgerActive"
      class="hamburger hamburger--3dx absolute pt-2 px-1 pb-0 top-4 right-4 focus:outline-a11y m:hidden"
      type="button"
      aria-haspopup="true"
      aria-controls="menu"
      aria-label="Toggles main navigation"
      @click="showMenu"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <ul
      class="dropdown-menu w-full fixed top-16 left-0 right-auto bg-blue-bg bg-opacity-95 shadow-nav hidden text-left pt-2 px-2 h-auto list-none m:w-auto m:top-auto m:left-auto m:right-0 m:bg-blue-darker m:shadow-none m:block m:text-right m:pt-4 m:pr-0"
    >
      <li
        class="inline"
        @click="$ga.event('navigation', 'click', 'sponosor me')"
      >
        <nuxt-link
          to="/sponsor-me/"
          class="highlighted text-black bg-yellow leading-loose inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1 hover:bg-white"
        >
          Sponsor Me
        </nuxt-link>
      </li>
      <li class="inline" @click="$ga.event('navigation', 'click', 'videos')">
        <nuxt-link
          :class="$route.name === 'videos-uid' ? 'active' : ''"
          to="/videos/"
          class="text-white bg-blue-main leading-loose inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1 hover:bg-red"
        >
          Videos
        </nuxt-link>
      </li>
      <li class="inline" @click="$ga.event('navigation', 'click', 'writings')">
        <nuxt-link
          :class="$route.name === 'writings-uid' ? 'active' : ''"
          to="/writings/"
          class="text-white bg-blue-main leading-loose inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1 hover:bg-red"
        >
          Writings
        </nuxt-link>
      </li>

      <li class="inline" @click="$ga.event('navigation', 'click', 'speaking')">
        <nuxt-link
          to="/speaking/"
          class="text-white bg-blue-main leading-loose inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1 hover:bg-red"
        >
          Speaking
        </nuxt-link>
      </li>
      <li class="inline" @click="$ga.event('navigation', 'click', 'about')">
        <nuxt-link
          to="/about/"
          class="text-white bg-blue-main leading-loose inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1 hover:bg-red"
        >
          About
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false,
    }
  },
  methods: {
    showMenu() {
      this.burgerActive = !this.burgerActive
      this.$ga.event('navigation', 'click', 'burger')
    },
  },
}
</script>

<style lang="postcss">
.head-link img {
  @apply border-2 border-solid border-white rounded-full;
}

.hamburger[aria-expanded='true'] + .dropdown-menu {
  @apply block;
}

.dropdown-menu li .active {
  @apply bg-red;
}

.dropdown-menu li .highlighted.active {
  @apply bg-white;
}
</style>
