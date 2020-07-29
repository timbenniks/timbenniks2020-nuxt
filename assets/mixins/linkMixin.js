export default {
  mounted() {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    addListeners() {
      this._links = this.$el.querySelectorAll('a[data-internal-link]')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].removeEventListener('click', this.navigate, false)
      }

      this._links = []
    },
    navigate(event) {
      const href = event.target.getAttribute('href')

      if (href && href[0] === '/') {
        event.preventDefault()
        this.$router.push(href)
      }
    },
  },
}
