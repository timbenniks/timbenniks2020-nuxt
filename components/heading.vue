<template>
  <div class="heading">
    <ol
      v-if="breadcrumb"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        @click="$ga.event('breadcrumb', 'click', 'home')"
      >
        <nuxt-link to="/" itemtype="https://schema.org/Thing" itemprop="item">
          <span itemprop="name">Home</span>
        </nuxt-link>
        <meta itemprop="position" content="1" />
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.path"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
        @click="$ga.event('breadcrumb', 'click', crumb.text)"
      >
        <nuxt-link
          :to="crumb.to"
          itemtype="https://schema.org/Thing"
          itemprop="item"
        >
          <span itemprop="name">{{ crumb.text }}</span>
        </nuxt-link>

        <meta :content="index + 2" itemprop="position" />
      </li>
    </ol>

    <fancy-title
      v-if="title && useFancyTitles"
      :tag="titletag"
      :field="title"
      color="red"
      type="large"
      :offset="[0, 0]"
      :uppercase="uppercase"
    />

    <fancy-title
      v-if="subtitle && useFancyTitles"
      :tag="subtitletag"
      :field="subtitle"
      color="blue-main"
      type="medium"
      :offset="[0, 0]"
      :uppercase="uppercase"
    />

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div :is="titletag" v-if="title && !useFancyTitles" v-html="title"></div>

    <!-- eslint-disable vue/no-v-html -->
    <div
      :is="subtitletag"
      v-if="subtitle && !useFancyTitles"
      v-html="subtitle"
    ></div>
    <!--eslint-enable-->
  </div>
</template>

<script>
import FancyTitle from '../components/fancy-title.vue'

export default {
  name: 'Heading',
  components: {
    FancyTitle,
  },
  props: {
    title: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    subtitle: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    titletag: {
      type: String,
      required: false,
      default: 'h1',
    },
    subtitletag: {
      type: String,
      required: false,
      default: 'h2',
    },
    breadcrumb: {
      type: Boolean,
      required: false,
      default: false,
    },
    uppercase: {
      type: Boolean,
      required: false,
      default: false,
    },
    useFancyTitles: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    crumbs() {
      const pathArray = this.$route.path.split('/')
      pathArray.shift()

      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (path) {
          breadcrumbArray.push({
            path,
            to: breadcrumbArray[idx - 1]
              ? '/' + breadcrumbArray[idx - 1].path + '/' + path
              : '/' + path,
            text: path
              .replace(/-/g, ' ')
              .toLowerCase()
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
          })
        }
        return breadcrumbArray
      }, [])

      return breadcrumbs
    },
  },
}
</script>

<style scoped lang="postcss">
/* // .heading {
//   margin: rem(0 0 20px);
// }

// h1 {
//   margin: rem(0 0 5px 0);
// }

// ol {
//   display: flex;
//   font-size: 12px;
//   list-style: none;
//   margin: rem(0 0 5px 0);
//   padding: 0;

//   .no-link {
//     color: $blue-main;
//   }

//   li {
//     margin: rem(0 20px 0 0);
//     position: relative;

//     &::before {
//       content: '›';
//       font-weight: bold;
//       left: -12px;
//       position: absolute;
//       top: 0;
//     }

//     &:last-child {
//       margin: 0;
//     }

//     &:first-child::before {
//       display: none;
//     }
//   }
// } */
</style>
