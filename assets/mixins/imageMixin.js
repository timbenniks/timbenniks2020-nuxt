import { loadImages } from '../prismic/imageTools'

export default {
  mounted() {
    this.$nextTick(loadImages)
  },
}
