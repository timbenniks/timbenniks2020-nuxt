import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import getPrismicApi from '@/datalayer/helpers/getPrismicApi';
import { asDay, asMonth, asYear } from '@/datalayer/helpers/modifiers';

const qsToTag = (tag) => {
  if (tag) {
    return tag.trim().replace(/-/g, ' ');
  } else {
    return '';
  }
};

export const useContent = async (tag) => {
  const api = await getPrismicApi();

  const videoData = await api.query(Prismic.Predicates.at('document.type', 'video'), {
    orderings: '[my.video.publication_date desc]',
    pageSize: 100,
  });

  const tagForQuery = qsToTag(tag);

  const tagsHolder = [];
  videoData.results.forEach((result) => {
    result.tags.forEach((tag) => {
      tagsHolder.push(tag);
    });
  });
  const tags = [...new Set(tagsHolder)];

  const videosForTag = videoData.results.filter((video) => {
    return video.tags.includes(tagForQuery);
  });

  const videos = videosForTag.map((video) => {
    return {
      uid: video.uid,
      slug: video.uid,
      title: RichText.asText(video.data.title),
      image: video.data.image.url,
      tags: video.tags,
      day: asDay(video.data.publication_date),
      month: asMonth(video.data.publication_date),
      year: asYear(video.data.publication_date),
    };
  });

  return {
    videos,
    tags,
    tag: tagForQuery,
    title: tagForQuery ? `Videos for: ${tagForQuery}` : 'No Tag Selected.',
  };
};
