<template>
  <div class="home-latest-writing posts">
    <fancy-title
      tag="h3"
      field="Latest writing"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <article v-for="post in data" :key="post.uid" class="post">
      <nuxt-link :to="`/writings/${post.uid}/`">
        <lazy-img
          ratio="16/9"
          :alt="post.title"
          :url="post.image"
          :caption="false"
          sizes="sm:100vw md:210px"
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
</template>

<script>
export default {
  name: 'HomeLatestWriting',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.home-latest-writing {
  .fancy-title {
    margin: rem(0 0 30px 0);
  }
  .post {
    .post-title {
      margin: 0 0 0.375rem !important;
    }

    .post-date {
      margin: 0;
    }
  }
}
</style>
