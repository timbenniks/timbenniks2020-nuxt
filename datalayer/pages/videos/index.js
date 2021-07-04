import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import getPrismicApi from '@/datalayer/helpers/getPrismicApi';
import { asDay, asMonth, asYear } from '@/datalayer/helpers/modifiers';

export const useContent = async () => {
  const api = await getPrismicApi();

  const result = await api.getSingle('youtube');

  const document = {
    ...result,
    title: RichText.asText(result.data.title),
  };

  const videosData = await api.query(Prismic.Predicates.at('document.type', 'video'), {
    orderings: '[my.video.publication_date desc]',
    pageSize: 100,
  });

  const tagsHolder = [];
  videosData.results.forEach((result) => {
    result.tags.forEach((tag) => {
      tagsHolder.push(tag);
    });
  });

  const tags = [...new Set(tagsHolder)];

  const videos = videosData.results.map((video) => {
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

  const metaInfo = {
    fields: document.data,
    pageType: 'videos',
  };

  return {
    document,
    videos,
    tags,
    metaInfo,
  };
};
