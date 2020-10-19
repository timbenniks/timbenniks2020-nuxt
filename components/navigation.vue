<template>
  <nav class="navigation" aria-label="Main Navigation">
    <nuxt-link to="/" class="head-link">
      <lazy-image
        ratio="1/1"
        alt="Tim Benniks Logo"
        url="https://images.prismic.io/timbenniks/375f865f-188c-4f83-9462-c8600aff4061_favicon.png"
        :caption="false"
        :widths="[103]"
        sizes="103px"
      />

      <span>TIM BENNIKS</span>
    </nuxt-link>

    <button
      id="button"
      :class="{ 'is-active': burgerActive }"
      :aria-expanded="burgerActive"
      class="hamburger hamburger--3dx"
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
    <ul id="menu" class="dropdown-menu">
      <li @click="$ga.event('navigation', 'click', 'sponosor me')">
        <nuxt-link to="/sponsor-me/" class="highlighted">
          Sponsor Me
        </nuxt-link>
      </li>
      <li @click="$ga.event('navigation', 'click', 'videos')">
        <nuxt-link
          :class="$route.name === 'videos-uid' ? 'active' : ''"
          to="/videos/"
        >
          Videos
        </nuxt-link>
      </li>
      <li @click="$ga.event('navigation', 'click', 'writings')">
        <nuxt-link
          :class="$route.name === 'writings-uid' ? 'active' : ''"
          to="/writings/"
        >
          Writings
        </nuxt-link>
      </li>

      <li @click="$ga.event('navigation', 'click', 'speaking')">
        <nuxt-link to="/speaking/">
          Speaking
        </nuxt-link>
      </li>
      <li @click="$ga.event('navigation', 'click', 'about')">
        <nuxt-link to="/about/">
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

<style lang="scss">
.navigation {
  background: darken($blue-dark, 3);
  border-bottom: 1px solid darken($blue-main, 20);
  left: 0;
  min-height: rem(64px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;

  ul {
    margin: 0;
  }

  li {
    display: inline;
  }

  .head-link {
    display: flex;
    left: rem(8px);
    padding: rem(4px 5px 3px 5px);
    position: absolute;
    text-decoration: none;
    top: rem(8px);

    span {
      align-self: center;
      color: $white;
      font-size: rem(16px);
      font-weight: 900;
    }

    &:focus {
      outline: 1px solid;
    }

    figure {
      align-self: center;
      display: block;
      margin: rem(0 10px 0 0);
      width: rem(39px);

      img {
        border: 2px solid $white;
        border-radius: 100%;
      }
    }
  }

  .hamburger {
    // prettier-ignore
    @include responsive('display', (xs: block, m: none));

    padding: rem(7px 3px 0);
    position: absolute;
    right: rem(13px);
    top: rem(17px);

    &:focus {
      outline: 1px solid;
    }
  }

  .hamburger[aria-expanded='true'] + .dropdown-menu {
    display: block;
  }
}

.dropdown-menu {
  // prettier-ignore
  @include responsive('width', (xs: 100%, m: auto));

  // prettier-ignore
  @include responsive('position', (xs: fixed));

  // prettier-ignore
  @include responsive('top', (xs: rem(64px), m: 0));

  // prettier-ignore
  @include responsive('left', (xs: 0, m: auto));

  // prettier-ignore
  @include responsive('right', (xs: auto, m: 0));

  // prettier-ignore
  @include responsive('background', (xs: rgba($blue-bg, 0.97), m: none));

  // prettier-ignore
  @include responsive('box-shadow', (xs: 0 10px 22px -6px rgba(#000, 0.8), m: none));

  // prettier-ignore
  @include responsive('display', (xs: none, m: block));

  // prettier-ignore
  @include responsive('text-align', (xs: left, m: right));

  // prettier-ignore
  @include responsive('padding', (xs: rem(10px 10px 0), m: rem(15px 0 0 0)));

  height: auto;
  left: 0;
  line-height: 2;
  list-style: none;

  a {
    color: $white;
    display: inline-block;
    font-size: rem(16px);
    font-weight: 900;
    letter-spacing: 0.01em;
    margin: rem(0 11px 11px 0);
    padding: rem(0 8px);
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    z-index: 1;

    &.highlighted {
      color: #000;
      background: $yellow;
    }

    @include hover-supported() {
      &::after {
        top: 0;
      }
    }

    &.active,
    &:focus {
      &::after {
        top: 0;
      }

      &::before {
        display: none;
      }
    }

    &::before {
      background: $blue-main;
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: skew(-4deg);
      z-index: -1;
    }

    &::after {
      background: $red;
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 100%;
      transform: skew(-4deg);
      transition: top 200ms ease;
      z-index: -1;
    }

    &.highlighted {
      &::before {
        background: $yellow;
      }
      &::after {
        background: $grey-light;
      }
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
