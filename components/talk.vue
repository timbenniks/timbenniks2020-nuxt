<template>
  <article class="post speaking">
    <div class="post-date">
      <span class="post-date-day">{{ talk.day }}</span>
      <span class="post-date-month">{{ talk.month }}</span>
      <span class="post-date-year">{{ talk.year }}</span>
    </div>
    <div class="post-content-wrapper">
      <div class="post-titles">
        <p class="post-title fancy-title red">
          <a :href="talk.link_to_event" target="_blank" rel="noopener">
            {{ talk.title }}
          </a>
        </p>
        <p class="post-subject">
          <span class="post-location">{{ talk.location }}</span> &mdash;
          {{ talk.subject }}
        </p>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

interface Talk {
  day: number;
  month: string;
  year: number;
  link_to_event: string;
  title: string;
  location: string;
  subject: string;
}

export default defineComponent({
  props: {
    talk: {
      type: Object as PropType<Talk>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.post.speaking {
  flex-direction: row;

  .post-date {
    flex: 1;
  }

  .post-content-wrapper {
    flex: 11;
  }
}
</style>
