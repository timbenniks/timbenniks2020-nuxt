<template>
  <nav class="navigation" aria-label="Main Navigation">
    <nuxt-link to="/" class="head-link">
      <figure style="--aspect-ratio: 1/1;">
        <img
          src="data:image/jpeg;base64,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"
          alt="Tim Benniks, logo in drawn in vector"
        />
      </figure>
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
      <li>
        <nuxt-link to="/sponsor-me/" class="highlighted">
          Sponsor Me
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :class="$route.name === 'videos-uid' ? 'active' : ''"
          to="/videos/"
        >
          Videos
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :class="$route.name === 'writings-uid' ? 'active' : ''"
          to="/writings/"
        >
          Writings
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/speaking/">
          Speaking
        </nuxt-link>
      </li>
      <li>
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
