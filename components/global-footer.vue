<template>
  <footer class="bg-blue-darker border-solid border-t-2 border-blue-alt">
    <div
      class="p-12 max-w-5xl flex flex-col justify-around my-0 mx-auto l:py-12 l:px-0 m:flex-row"
    >
      <div class="footer-links flex flex-1">
        <ul class="list-none p-0 mb-12">
          <li @click="$ga.event('footer_navigation', 'click', 'sponosor me')">
            <nuxt-link
              to="/sponsor-me"
              class="block mb-3 text-blue-light underline hover:text-white"
              >Sponsor Me</nuxt-link
            >
          </li>
          <li @click="$ga.event('footer_navigation', 'click', 'videos')">
            <nuxt-link
              to="/videos"
              class="block mb-3 text-blue-light underline hover:text-white"
              >Videos</nuxt-link
            >
          </li>
          <li @click="$ga.event('footer_navigation', 'click', 'writings')">
            <nuxt-link
              to="/writings"
              class="block mb-3 text-blue-light underline hover:text-white"
              >Writings</nuxt-link
            >
          </li>
          <li @click="$ga.event('footer_navigation', 'click', 'speaking')">
            <nuxt-link
              to="/speaking"
              class="block mb-3 text-blue-light underline hover:text-white"
              >Speaking</nuxt-link
            >
          </li>
          <li @click="$ga.event('footer_navigation', 'click', 'about')">
            <nuxt-link
              to="/about"
              class="block mb-3 text-blue-light underline hover:text-white"
              >About</nuxt-link
            >
          </li>
          <li @click="$ga.event('footer_navigation', 'click', 'feed')">
            <a
              href="/feed.xml"
              class="block mb-3 text-blue-light underline hover:text-white"
              >RSS Feed</a
            >
          </li>
        </ul>
      </div>

      <div class="sponsors flex-1">
        <p class="mb-4 text-sm">Proudly sponsored by</p>
        <ul class="list-none p-0 mb-6">
          <li class="inline-block my-2 mr-4 ml-0">
            <a
              rel="noopener"
              target="_blank"
              href="https://twitter.com/MayaShavin"
              title="@MayaShavin on Twitter"
              @click="$ga.event('sponsors', 'click', 'maya-shavin')"
            >
              <figure class="w-10 h-10" style="--aspect-ratio: 1/1">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/maya-shavin.jpg')"
                  alt="@MayaShavin on Twitter"
                  width="100"
                  height="100"
                  class="rounded-full border-2 border-white"
                />
              </figure>
            </a>
          </li>
          <li class="inline-block my-2 mr-4 ml-0">
            <a
              rel="noopener"
              target="_blank"
              title="@passionpeopleNL on Twitter"
              href="https://twitter.com/passionpeopleNL"
              @click="$ga.event('sponsors', 'click', 'passionpeopleNL')"
            >
              <figure class="w-10 h-10" style="--aspect-ratio: 1/1">
                <img
                  :src="require('../assets/images/sponsors/pp.jpg')"
                  alt="@passionpeopleNL on Twitter"
                  loading="lazy"
                  width="100"
                  height="100"
                  class="rounded-full border-2 border-white"
                />
              </figure>
            </a>
          </li>
          <li class="inline-block my-2 mr-4 ml-0">
            <a
              rel="noopener"
              target="_blank"
              title="@VueStorefront on Twitter"
              href="https://twitter.com/VueStorefront"
              @click="$ga.event('sponsors', 'click', 'VueStorefront')"
            >
              <figure class="w-10 h-10" style="--aspect-ratio: 1/1">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/vsf.jpg')"
                  alt="@VueStorefront on Twitter"
                  width="100"
                  height="100"
                  class="rounded-full border-2 border-white"
                />
              </figure>
            </a>
          </li>
          <li class="inline-block my-2 mr-4 ml-0">
            <a
              rel="noopener"
              target="_blank"
              title="@Cloudinary on Twitter"
              href="https://twitter.com/cloudinary"
              @click="$ga.event('sponsors', 'click', 'Cloudinary')"
            >
              <figure class="w-10 h-10" style="--aspect-ratio: 1/1">
                <img
                  loading="lazy"
                  :src="require('../assets/images/sponsors/cloudinary.jpg')"
                  alt="@VueStorefront on Twitter"
                  width="100"
                  height="100"
                  class="rounded-full border-2 border-white"
                />
              </figure>
            </a>
          </li>
        </ul>
      </div>

      <div class="built-on flex-1">
        <div class="mb-7 text-sm">
          Made with
          <span class="sr-only">love</span>
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-4 mx-1 inline"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>

          by Tim Benniks © 2021
        </div>

        <div class="built-on-wrapper flex justify-between">
          <a
            href="https://vercel.com"
            rel="noopener"
            target="_blank"
            aria-label="go to vercel"
          >
            <iconVercel
              alt="Vercel"
              class="border-2 border-white rounded-md h-8"
            />
          </a>
          <a
            href="https://nuxtjs.org"
            rel="noopener"
            target="_blank"
            aria-label="go to nuxt"
          >
            <iconWithNuxt
              alt="Nuxt"
              class="border-2 border-white rounded-md h-8"
            />
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
<style lang="postcss">
.sponsors {
  flex-grow: 1.1;
}

.built-on-wrapper {
  max-width: 15rem;
}
</style>
