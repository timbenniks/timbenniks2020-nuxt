export default {
  mounted() {
    this.$nextTick(this.findIframes)
  },
  methods: {
    findIframes() {
      this.frames = [...document.querySelectorAll('iframe[data-src]')]

      this.frames.forEach((frame) => {
        const observer = new IntersectionObserver((changes) => {
          changes.forEach((change) => {
            if (change.isIntersecting) {
              if (!frame.getAttribute('data-active')) {
                frame.src = frame.getAttribute('data-src')
                frame.setAttribute('data-active', true)
              }

              observer.unobserve(frame)
            }
          })
        })

        observer.observe(frame)
      })
    },
  },
}
