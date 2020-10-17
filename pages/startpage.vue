<template>
  <div class="content-wrapper startpage">
    <main id="main-content">
      <lazy-image
        ratio="1/1"
        alt="Tim Benniks"
        url="https://images.prismic.io/timbenniks/375f865f-188c-4f83-9462-c8600aff4061_favicon.png"
        extra-class="opacity-only"
        :caption="false"
        :widths="[200]"
        sizes="200px"
      />

      <fancy-title
        field="Tim's startpage"
        tag="h1"
        color="red"
        type="large"
        :offset="[0, 1]"
        :uppercase="true"
      />

      <div class="stats-wrapper">
        <yt-stats />
        <tw-stats />
      </div>

      <ul class="quicklinks">
        <quick-link
          url="https://twitter.com"
          label="Twitter"
          image="twitter.png"
        />
        <quick-link
          url="https://youtube.com"
          label="youtube"
          image="youtube.png"
        />

        <quick-link
          url="https://app.netlify.com/teams/timbenniks/sites"
          label="Netlify"
          image="netlify.png"
        />

        <quick-link
          url="https://vercel.com/timbenniks/"
          label="Vercel"
          image="vercel.png"
        />

        <quick-link
          url="https://github.com"
          label="Github"
          image="github.png"
        />
        <quick-link
          url="https://gitlab.com"
          label="Gitlab"
          image="gitlab.png"
        />

        <quick-link
          url="https://instagram.com"
          label="Instagram"
          image="instagram.png"
        />
        <quick-link
          url="https://facebook.com"
          label="Facebook"
          image="facebook.png"
        />
        <quick-link
          url="https://messenger.com"
          label="Messenger"
          image="messenger.png"
        />
        <quick-link
          url="https://reddit.com"
          label="Reddit"
          image="reddit.png"
        />
        <quick-link url="https://amazon.fr" label="Amazon" image="amazon.png" />
        <quick-link
          url="https://linkedin.com"
          label="LinkedIn"
          image="linkedin.png"
        />
        <quick-link url="https://app.put.io" label="Put.io" image="put.png" />

        <quick-link
          url="https://web.whatsapp.com"
          label="WhatsApp"
          image="whatsapp.png"
        />
        <quick-link url="https://gmail.com" label="Gmail" image="gmail.png" />

        <quick-link
          url="https://timbenniks.dev"
          label="timbenniks.dev"
          image="timbenniks.png"
        />

        <quick-link
          url="https://auth.openair.com/login_sso"
          label="OpenAir"
          image="openair.png"
        />

        <quick-link
          url="https://timbenniks.prismic.io/documents/working/"
          label="Prismic"
          image="prismic.png"
        />

        <quick-link
          url="https://buymeacoffee.com/timbenniks"
          label="Buy Me A Coffee"
          image="buymeacoffee.jpg"
        />

        <quick-link
          url="https://www.paypal.com/myaccount/summary"
          label="PayPal"
          image="paypal.png"
        />

        <quick-link
          url="https://primevideo.com"
          label="Prime Video"
          image="primevideo.jpg"
        />
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Tim's Startpage",
    description: "Tim's Startpage",
  },
}
</script>

<style lang="scss">
.startpage {
  max-width: rem(1000px);
  margin: 0;

  main {
    padding: 0.5rem 1.25rem 2.5rem;
  }

  figure {
    position: relative;
    top: rem(20px);
    left: rem(20px);

    // prettier-ignore
    @include responsive('width', (xs: rem(100px), m: rem(140px)));

    img {
      border-radius: 100%;
      border: 5px solid $white;
    }
  }

  .stats-wrapper {
    display: flex;
    margin: 2rem 0 0 0;
  }

  .quicklinks {
    list-style: none;
    max-width: 40rem;
    margin: rem(30px 0 0 15px);
    columns: 3;
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

  .search {
    padding: 1rem;

    input {
      width: rem(393px);
      height: rem(30px);
      line-height: rem(30px);
    }
  }
}
</style>
