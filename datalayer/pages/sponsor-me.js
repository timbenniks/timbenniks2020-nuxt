import { RichText } from 'prismic-dom';
import getPrismicApi from '@/datalayer/helpers/getPrismicApi';
import linkResolver from '@/datalayer/helpers/linkresolver';
import htmlSerializer from '@/datalayer/helpers/htmlserializer';

export const useContent = async (context) => {
  const api = await getPrismicApi();
  const result = await api.getSingle('sponsor');

  const document = {
    title: RichText.asText(result.data.title),
    subTitle: RichText.asText(result.data.sub_title),
    content: RichText.asHtml(result.data.content, linkResolver, htmlSerializer),
    ...result,
  };

  const metaInfo = {
    fields: {
      id: document.uid,
      last_publication_date: document.last_publication_date,
      ...document.data,
    },
    pageType: 'writing',
  };

  return {
    document,
    metaInfo,
  };
};
