function getPropType(fields, type, prop) {
  if (prop === 'image') {
    return fields.body.find((card) => card.slice_type === type).primary[prop]
      .url
  } else {
    return fields.body.find((card) => card.slice_type === type).primary[prop][0]
      .text
  }
}

export default function (fields, pageType, path) {
  const url = `https://nostalgic-joliot-2055e1.netlify.app${path}`
  const metaData = {
    title: getPropType(fields, 'general_card', 'title'),
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
    meta: [
      {
        property: 'og:title',
        hid: 'og:title',
        content: getPropType(fields, 'general_card', 'title'),
      },
      {
        property: 'twitter:title',
        hid: 'twitter:title',
        content: getPropType(fields, 'twitter_card', 'title'),
      },
      {
        name: 'description',
        hid: 'description',
        content: getPropType(fields, 'general_card', 'description'),
      },
      {
        property: 'og:description',
        hid: 'og:description',
        content: getPropType(fields, 'general_card', 'description'),
      },
      {
        property: 'twitter:description',
        hid: 'twitter:description',
        content: getPropType(fields, 'twitter_card', 'description'),
      },
      {
        property: 'og:image',
        hid: 'og:image',
        content: getPropType(fields, 'general_card', 'image'),
      },
      {
        property: 'twitter:image',
        hid: 'twitter:image',
        content: getPropType(fields, 'twitter_card', 'image'),
      },
      {
        property: 'og:url',
        hid: 'og:url',
        content: url,
      },
      {
        property: 'twitter:url',
        hid: 'twitter:url',
        content: url,
      },
    ],
  }

  if (
    pageType === 'speaking' ||
    pageType === 'videos' ||
    pageType === 'video' ||
    pageType === 'home' ||
    pageType === 'writings'
  ) {
    metaData.meta.push({
      property: 'og:type',
      hid: 'og:type',
      content: 'website',
    })
  }

  if (pageType === 'home') {
    metaData.script = [
      {
        json: {
          '@context': 'http://schema.org',
          '@type': 'Website',
          url: 'https://timbenniks.dev',
        },
        type: 'application/ld+json',
      },
    ]
  }

  if (pageType === 'video') {
    metaData.meta.push({
      property: 'og:video',
      hid: 'og:video',
      content: fields.video_embed.embed_url,
    })

    metaData.meta.push({
      property: 'og:publish_date',
      content: `${fields.last_publication_date}`,
      name: 'publish_date',
    })

    metaData.script = [
      {
        json: {
          '@context': 'http://schema.org',
          '@type': 'VideoObject',
          name: getPropType(fields, 'general_card', 'title'),
          description: getPropType(fields, 'general_card', 'description'),
          thumbnailUrl: [getPropType(fields, 'general_card', 'image')],
          embedUrl: fields.video_embed.embed_url.replace('watch?v=', 'embed/'),
          contentUrl: `https://timbenniks.dev/videos/${fields.id}`,
          uploadDate: `${fields.last_publication_date}`,
        },
        type: 'application/ld+json',
      },
    ]
  }

  if (pageType === 'writing') {
    metaData.meta.push({
      property: 'og:type',
      hid: 'og:type',
      content: 'article',
    })

    metaData.meta.push({
      property: 'og:publish_date',
      content: `${fields.last_publication_date}`,
      name: 'publish_date',
    })

    metaData.script = [
      {
        json: {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          headline: getPropType(fields, 'general_card', 'title'),
          image: getPropType(fields, 'general_card', 'image'),
          url: `https://timbenniks.dev/writings/${fields.id}`,
          datePublished: `${fields.publication_date}`,
          dateCreated: `${fields.publication_date}`,
          dateModified: fields.last_publication_date,
          description: getPropType(fields, 'general_card', 'description'),
          publisher: {
            '@type': 'Organization',
            name: 'Tim Benniks',
            logo: {
              '@type': 'ImageObject',
              url: getPropType(fields, 'general_card', 'image'),
            },
          },
          author: {
            '@type': 'Person',
            name: 'Tim Benniks',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://google.com/article`,
          },
        },
        type: 'application/ld+json',
      },
    ]
  }

  return metaData
}
