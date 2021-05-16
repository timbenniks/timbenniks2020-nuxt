<template>
  <div class="content-wrapper writings">
    <navigation />

    <main id="main-content">
      <heading
        :breadcrumb="true"
        titletag="h1"
        :title="document.title"
        :uppercase="true"
      />

      <div class="posts">
        <article v-for="post in writings" :key="post.uid" class="post">
          <nuxt-link :to="`/writings/${post.uid}/`">
            <lazy-img
              ratio="16/9"
              :alt="post.title"
              :url="post.image"
              :caption="false"
              sizes="sm:100vw md:320px"
            />
          </nuxt-link>

          <div class="post-content-wrapper">
            <p class="post-title fancy-title red">
              <nuxt-link :to="`/writings/${post.uid}/`">
                {{ post.title }}
              </nuxt-link>
            </p>
            <p class="post-description">
              <span class="post-date">
                {{ post.day }}
                {{ post.month }}
                {{ post.year }}
              </span>
              &mdash; {{ post.sub_title }}
            </p>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import mapMetaInfo from '@/datalayer/helpers/mapMetaInfo'

export default {
  async asyncData(context) {
    const { handler } = await import(
      /* webpackChunkName: "datalayer-page-writings" */ '@/datalayer/pages/writings'
    )
    const { document, writings, metaInfo } = await handler(context)
    return {
      document,
      writings,
      metaInfo,
    }
  },
  head() {
    return mapMetaInfo(
      this.metaInfo.fields,
      this.metaInfo.pageType,
      this.$router.currentRoute.path
    )
  },
}
</script>

<style lang="scss" scoped>
.post-date {
  float: none;
  font-weight: 400;
  margin: 0;
}
</style>
