<template>
  <nav class="navigation" aria-label="Main Navigation">
    <nuxt-link to="/" class="head-link">
      <figure style="--aspect-ratio: 1/1;">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAQEBAQEBAQFBQQGBgYGBgkIBwcICQ0KCgoKCg0UDQ8NDQ8NFBIWEhESFhIgGRcXGSAlHx4fJS0pKS05NjlLS2QBBAQEBAQEBAUFBAYGBgYGCQgHBwgJDQoKCgoKDRQNDw0NDw0UEhYSERIWEiAZFxcZICUfHh8lLSkpLTk2OUtLZP/AABEIAGcAZwMBIgACEQEDEQH/xACSAAEAAgIDAQEAAAAAAAAAAAAABQgGBwIDCQQBEAABBAECBAUBBAoDAAAAAAABAAIDBAUGEQcSIUETIjFRcTIIFFJhFSNyc4GisbLBwhaR0QEAAgMBAQEAAAAAAAAAAAAAAAQDBQYHAgERAAICAgAFAwQCAwAAAAAAAAECAAMEEQUSIUFRMTJxFSJhghOBkaHB/9oADAMBAAIRAxEAPwCxiIi1Uo4RERCEWM6i1fgNLw8+RutbIRuyuzzTP+G/5K0Xl+NWatPcMVRgpw9nyjxZT/gKauiy32r08mRtYieplmkVSoOLmtYn8z7leYfhfAwD+TlWYYrjkRI1mXwo5e8tV3+j17bEuXsD8GeRfWe5EsKig8DqPD6lqG1jLjZmNOz2/S9h9nNPUKcS5BBII0ZMCDCIi+QhEREJ8lG/UyVZlmpO2aJ/o5v9D7FfWqv4bOZHBWRNTm2B+uM9WPHs4Le+ndWY7UEYaw+DaA3fXcevy09wrTO4XbibddvV57j5iWNmpfpW+1/Hn4mUrQvEriddxN2fCYUtjmjaBZt+pYXDfkjW+lS3ibVNTXGfZ2fKyUH94wPSmKivYeYb0Nye5iq9O5mG2LFi3NJPYnkmlkO75JHFznH3JK/Gei6lzYepVqImZ2rrkHQFdi/HdQV6nmZXoDUEmndUY2wZS2vNIILI7GOQ7bn9k9VdheeavHonLOzmlcJee7mkfXDJT7yRHkcf4kKuzU9j/wBGN47e5ZlKIiQjMIiIhKjrnFLJDIySKRzHsO7XNOxBHcELgi6NMjNw6Z4gtk8OpmHBrvRlrsf2/b5WquNdVseqKVtmxZbx8buYdyxxChrt+vRYHSu6n6Wj1Kg45b+qslhaMzpW1TajrxEAuETZ3hpIKz+ZiY1FptqblOiXrHprz+JbY+RdYnI42NjlczFAVzY2QuAaOq9FcP8AZ04Y4zkM9C1kns72rDv7YuQLaGM0XpHCs5MdpnGVR3MdaMOPydtys1Zx7GX2VO3zoS4Xhlp9zqv+55XwYfK2NuSrL1928v8AdspeHRepJ/ox07vhpd/aCvU5kNau0lkUUQA3JDQ0BR7tXaTbK6J2p8SJG77sNyHmHKNzuObsFF9eZvZhE/vv/kk+lqPdkAfrPMi1oHVdOpLakwV7wohu9xqyBgHuXbLeHBO8ZtOZCm76ql4kN9mStB/qCrJcaIX3eGOohAJZAW1pN4HhruVk7H8wKqzwlkuRZjKV5rT5BNTEhE0PJM4xvADi7rzAc/cpunLOfiWuawhV9aB3F7KBjXogctzLub6REUEkhEREJUdERdGmRnVJBBK5jpIWPLfpLgDso7I5bK4OWlcxto15GOIbI0Dma7boRuDspZReXqSXKT44wC8ODmj4UGTXz0XKB1Zf8yWl+W2sk9AZh9bN5mlakt1cvdgsvcXPnineyRzj3LgQSVv3hvxa4wvizdTFsZqE1aT7spyBfLJDFF0JYedhPwtPnh7rv7vBZbo/MSQTRtkjliqSSMcxw3BBYCrj/Zt0DkdNYTMZjL0JatvKSMiignYWSNgh7lruo5yVieJW4qYzsyVWMCAFPnc0mGlzXKAzoNEkiUv1HrPUuqrty1lMvamFiZ0hg8V/gM5jvyxsJIa0dgsegsz1ZGyQTPjcHBwLTt1adwticWNDWtB6xyVEwFtGxI6xj5NvK6B53Dfln0la0T9BqemtqgORlBAEWsDrYwcnmB6yxXDHN8VtZVM7p7GWoMjj4saY5KV7kbWDJ5A3l3byvHTm25SpzhvgWYXJWLTp4ImW2TVoIobD5IpXxP8AO6NsjGuAbyEbndZ/9nbB29LaB1Xqa5VdA66DNB4g25oKkbiH/BJK6NMsbDDTobtfFWp1bVSQdCWSxFh5x+IuDj/FVX8ytfnJWqKiso+0a2dddx0oRVjMzMWIPr2HaZkiIvE+wiIiEqOiIujTIwiIiEvhwiyH6R4f4BxO7q7JK7vy8J5A/lWdKnnAvX8WndS3NM5OUR081IyWjK4+VloNDCw/vAFbp+Ls2Xvfay1kjc+HHXP3djB2+klzj8nb8lyTjGMcbiWWrDlVrGdfyGO5vOH3C7DxyOpCBW+QJ9M9avaZyTwRzM/DI0OH/RXWzB4WNwczEUmkehEDAf6LrjxduNzSM/kC0EHkcK5BHsSYt1Ba21/prQONddzF4NeQfAqs2dPO72Y1VyLYzKlZLFvQLuNsVUFn0AO5mtvtGar/AOO6Alx8EnJZzcoqMA7QDzSn/VQeCrQQYug+OMB8lSDnf6l2zAB1PYKp/EbiJmeJ+fht2oGQQwgw0ajDuI2OPc93HuVvvResqc9Khi7zmwWYII4WSE+SXkAaPhxWtxuG304I1WSwJa3X5lFdmVWZJ2+gRpNzZqIigkkIiIhKjoiLo0yMIiIhIzK0/vVVxZuJovPE4eoIUdk+IuuczSo0shqi/YgpzCaAPk87ZG+juceYkdtyskUDfwMFoukhPhSHqfwlVudgjIZLAis6+RHcXJNQZCxCmZNNx64rTU21Tqp7WhvKZGQQNlPy8M3WrrNrJZq6+e1asXbUx80sr3SSOP5uduVO19M9d7Fgbfhj/wDSsirUqtMEQwhu/qfUn+JSWNwkIdipKgfXQAJjF2fzDXO1h7bJ1IrEYb7kfGmIdMR0A9GqfRFd11pUoVBoSsd2sYsxmw9M68tYzw6uQL7FUdGv9ZIx/kLdlO5Vv147FWdksTxu17SqoKbwmfyOBseLUl8jj+shd1Y/5Cqc/hFd+7KdJZ3HZo/i57VaSzbJ57iWdRY1p/VGO1BF+qd4Vho3kruPmH5j3CLL2VWUuUsQqw9QZdo62KGVgQZWxERdCmThEREIRERCEREQhEREIRERCcmPfG4OY9zXD0LTsURF8Kg+oBn0EjvP/9k="
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
