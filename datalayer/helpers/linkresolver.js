module.exports = function (doc) {
  if (doc.type === 'home') {
    return '/'
  }

  if (doc.type === 'speaking') {
    return '/speaking'
  }

  if (doc.type === 'writings') {
    return '/writings'
  }

  if (doc.type === 'youtube') {
    return '/videos'
  }

  if (doc.type === 'about') {
    return '/about'
  }

  if (doc.type === 'writing') {
    return `/writings/${doc.uid}`
  }

  if (doc.type === 'video') {
    return `/videos/${doc.uid}`
  }

  return '/'
}
