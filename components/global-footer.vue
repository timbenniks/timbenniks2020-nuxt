<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-links">
        <ul>
          <li>
            <nuxt-link to="/sponsor-me">Sponsor Me</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/videos">Videos</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/writings">Writings</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/speaking">Speaking</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">About</nuxt-link>
          </li>
          <li>
            <a href="/feed.xml">RSS Feed</a>
          </li>
        </ul>
      </div>

      <div class="sponsors">
        <p>Proudly sponsored by</p>
        <ul>
          <!-- <li>
            <a
              rel="noopener"
              target="_blank"
              href="https://twitter.com/carwack"
              title="@carwack on Twitter"
            >
              <figure style="--aspect-ratio: 1/1;">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/carwack.jpg')"
                  alt="@carwack on Twitter"
                  width="100"
                  height="100"
                />
              </figure>
            </a>
          </li> -->
          <li>
            <a
              rel="noopener"
              target="_blank"
              href="https://twitter.com/MayaShavin"
              title="@MayaShavin on Twitter"
            >
              <figure style="--aspect-ratio: 1/1;">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/maya-shavin.jpg')"
                  alt="@MayaShavin on Twitter"
                  width="100"
                  height="100"
                />
              </figure>
            </a>
          </li>
          <li>
            <a
              rel="noopener"
              target="_blank"
              title="@passionpeopleNL on Twitter"
              href="https://twitter.com/passionpeopleNL"
            >
              <figure style="--aspect-ratio: 1/1;">
                <img
                  :src="require('../assets/images/sponsors/pp.jpg')"
                  alt="@passionpeopleNL on Twitter"
                  loading="lazy"
                  width="100"
                  height="100"
                />
              </figure>
            </a>
          </li>
          <li>
            <a
              rel="noopener"
              target="_blank"
              title="@VueStorefront on Twitter"
              href="https://twitter.com/VueStorefront"
            >
              <figure style="--aspect-ratio: 1/1;">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/vsf.jpg')"
                  alt="@VueStorefront on Twitter"
                  width="100"
                  height="100"
                />
              </figure>
            </a>
          </li>
          <li>
            <a
              rel="noopener"
              target="_blank"
              title="@Cloudinary on Twitter"
              href="https://twitter.com/cloudinary"
            >
              <figure style="--aspect-ratio: 1/1;">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/cloudinary.jpg')"
                  alt="@VueStorefront on Twitter"
                  width="100"
                  height="100"
                />
              </figure>
            </a>
          </li>
        </ul>
      </div>

      <div class="built-on">
        <div class="copyright">
          Made with
          <span class="sr-only">love</span>
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>

          by Tim Benniks © 2020
        </div>

        <div class="built-on-wrapper">
          <a
            href="https://vercel.com"
            rel="noopener"
            target="_blank"
            aria-label="go to vercel"
          >
            <iconVercel alt="Vercel" />
          </a>
          <a
            href="https://nuxtjs.org"
            rel="noopener"
            target="_blank"
            aria-label="go to nuxt"
          >
            <iconWithNuxt alt="Nuxt" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import iconVercel from './iconVercel.vue'
import iconWithNuxt from './iconWithNuxt.vue'

export default {
  components: {
    iconWithNuxt,
    iconVercel,
  },
}
</script>
<style lang="scss">
footer {
  background: darken($blue-dark, 3);
  border-top: 1px solid darken($blue-main, 20);

  .footer-inner {
    // prettier-ignore
    @include responsive('padding', ( xs: 3rem, l: 3rem 0 ));

    // prettier-ignore
    @include responsive('flex-direction', ( xs: column, m: row ));

    display: flex;
    justify-content: space-around;
    max-width: rem(1068px);
    margin: 0 auto;

    .footer-links {
      flex: 1;

      ul {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;

        a {
          display: block;
          margin: 0 0 1rem;

          &.active {
            color: $white;
          }
        }
      }
    }
  }

  .sponsors {
    flex: 2;

    ul {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;

      li {
        display: inline-block;
        margin: rem(5px 10px 5px 0);
      }
    }

    p {
      font-weight: 400;
      margin: 0 0 1rem 0;
      font-size: 0.8rem;
    }

    figure {
      width: 40px;
      height: 40px;

      img {
        border-radius: 100%;
        border: 2px solid $white;
      }
    }
  }

  .copyright {
    margin: 0 0 1rem 0;
    font-size: 0.8rem;
    color: $grey-light-alt;

    svg {
      width: 1em;
      margin: 0 0.2rem;
    }
  }

  .built-on {
    flex: 1;

    .built-on-wrapper {
      max-width: rem(280px);
      display: flex;
      justify-content: space-between;

      svg {
        border: 2px solid rgba(255, 255, 255, 0.7);
        border-radius: rem(5px);
        height: rem(35px);

        &:first-child {
          margin: rem(0 0.5rem 0 0);
        }
      }
    }
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
