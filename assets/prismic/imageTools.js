export function loadImages() {
  const images = [...document.querySelectorAll('img.lazy:not(.lazy-done)')]

  const setImage = (image) => {
    if (!image.classList.contains('lazy-done')) {
      image.srcset = image.dataset.srcset
      image.sizes = image.dataset.sizes
      image.classList.add('lazy-done')
    }
  }

  images.forEach((image) => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((changes) => {
        changes.forEach((change) => {
          if (change.isIntersecting) {
            setImage(image)
            observer.unobserve(image)
          }
        })
      })

      observer.observe(image)
    } else {
      setImage(image)
    }
  })
}

export const nativeLazySupported = true // 'loading' in HTMLImageElement.prototype

export function getSrcSet(baseUrl, sizes) {
  let srcset = ''

  sizes.forEach((size) => {
    srcset += `${baseUrl}&w=${size} ${size}w, `
  })

  return srcset.slice(0, -1)
}
