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

export function concatCloudinaryUrl(url, opts) {
  return `https://res.cloudinary.com/dwfcofnrd/image/fetch/ar_${opts.ratio},c_${opts.crop},f_auto,q_auto,w_${opts.width}/${url}`
}

export function getSrcSet(baseUrl, widths, ratio) {
  const cleanUrl = baseUrl.replace('?auto=compress,format', '')
  let srcset = ''

  widths.forEach((width) => {
    const opts = {
      crop: 'scale',
      width,
    }

    if (ratio) {
      opts.ratio = ratio.replace('/', ':')
      opts.crop = 'fill'
    }

    const url = concatCloudinaryUrl(cleanUrl, opts)
    srcset += `${url} ${width}w, `
  })

  return srcset.slice(0, -2)
}
