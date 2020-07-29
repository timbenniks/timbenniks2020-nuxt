import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import bash from 'highlight.js/lib/languages/bash'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('bash', bash)

export default {
  mounted() {
    this.$nextTick(this.highlight)
  },
  methods: {
    highlight() {
      document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block)
      })
    },
  },
}
