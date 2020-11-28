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
      id="menu"
      class="dropdown-menu m-0 w-full fixed top-16 left-0 right-auto bg-blue-bg bg-opacity-95 shadow-xl hidden text-left pt-2 pr-2 h-auto leading-loose list-none m:w-auto m:top-auto m:left-auto m:right-0 m:bg-none m:shadow-none m:block m:text-right m:pt-4 m:pr-0"
    >
      <li @click="$ga.event('navigation', 'click', 'sponosor me')">
        <nuxt-link
          to="/sponsor-me/"
          class="highlighted text-white inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1"
        >
          Sponsor Me
        </nuxt-link>
      </li>
      <li @click="$ga.event('navigation', 'click', 'videos')">
        <nuxt-link
          :class="$route.name === 'videos-uid' ? 'active' : ''"
          to="/videos/"
          class="text-white inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1"
        >
          Videos
        </nuxt-link>
      </li>
      <li @click="$ga.event('navigation', 'click', 'writings')">
        <nuxt-link
          :class="$route.name === 'writings-uid' ? 'active' : ''"
          to="/writings/"
          class="text-white inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1"
        >
          Writings
        </nuxt-link>
      </li>

      <li @click="$ga.event('navigation', 'click', 'speaking')">
        <nuxt-link
          to="/speaking/"
          class="text-white inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1"
        >
          Speaking
        </nuxt-link>
      </li>
      <li @click="$ga.event('navigation', 'click', 'about')">
        <nuxt-link
          to="/about/"
          class="text-white inline-block text-base font-black tracking-wide mr-3 mb-3 px-2 relative no-underline uppercase z-1"
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
.navigation ul li {
  @apply inline;
}

.head-link img {
  @apply border-2 border-solid border-white rounded-full;
}

.hamburger[aria-expanded='true'] + .dropdown-menu {
  @apply block;
}

.dropdown-menu a.active,
.dropdown-menu a::focus {
  @apply after:top-0
    before:hidden
    before:left-0;
}

.dropdown-menu a {
  @apply before:bg-blue-main
    before:bottom-0
    before:left-0
    before:absolute
    before:right-0
    before:top-0
    before:z-n1
    before:-skew-x-3

    after:bg-red
    after:bottom-0
    after:left-0
    after:absolute
    after:top-full
    after:-skew-x-3
    after:z-n1
    after:transition
    after:duration-200
    after:ease;
}
</style>

<style lang="scss">
// .dropdown-menu {
//   a {
//     &::before {
//       background: $blue-main;
//       bottom: 0;
//       content: '';
//       left: 0;
//       position: absolute;
//       right: 0;
//       top: 0;
//       transform: skew(-4deg);
//       z-index: -1;
//     }

//     &::after {
//       background: $red;
//       bottom: 0;
//       content: '';
//       left: 0;
//       position: absolute;
//       right: 0;
//       top: 100%;
//       transform: skew(-4deg);
//       transition: top 200ms ease;
//       z-index: -1;
//     }

//     &.highlighted {
//       color: #000;
//       background: $yellow;
//     }

//     @include hover-supported() {
//       &::after {
//         top: 0;
//       }
//     }

//     &.active,
//     &:focus {
//       &::after {
//         top: 0;
//       }

//       &::before {
//         display: none;
//       }
//     }

//     &.highlighted {
//       &::before {
//         background: $yellow;
//       }
//       &::after {
//         background: $grey-light;
//       }
//     }

//     &:focus {
//       outline: none;
//     }
//   }
// }
//
</style>
